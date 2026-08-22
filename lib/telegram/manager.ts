import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH || "";
const initialSessionString = process.env.TELEGRAM_SESSION || "";

export type TelegramStatus = "IDLE" | "CODE_SENT" | "WAITING_FOR_2FA" | "AUTHORIZED" | "FLOOD_WAIT";

interface InternalState {
  client: TelegramClient | null;
  status: TelegramStatus;
  phoneCodeHash?: string;
  phoneNumber?: string;
  phoneCode?: string;
  floodUntil: number;
  isProcessing: boolean;
  isConnecting: boolean; 
}

const globalForTelegram = globalThis as unknown as { _tgState: InternalState };
if (!globalForTelegram._tgState) {
  globalForTelegram._tgState = { 
    client: null, 
    status: "IDLE", 
    floodUntil: 0,
    isProcessing: false,
    isConnecting: false
  };
}
const state = globalForTelegram._tgState;

class TelegramManager {
  public async getClient(): Promise<TelegramClient> {
    if (Date.now() < state.floodUntil) throw new Error(`FLOOD_WAIT`);

    if (!state.client) {
      state.client = new TelegramClient(new StringSession(initialSessionString), apiId, apiHash, {
        connectionRetries: 5,
        timeout: 10000,
      });
    }

    if (!state.client.connected) {
      if (state.isConnecting) {
        await new Promise(r => setTimeout(r, 2000));
      } else {
        state.isConnecting = true;
        try {
          console.log("[Manager] Connecting...");
          await state.client.connect();
        } finally {
          state.isConnecting = false;
        }
      }
    }

    // Auth Validation
    if (state.status !== "AUTHORIZED") {
      if (initialSessionString) {
        const isAuth = await state.client.checkAuthorization();
        if (isAuth) state.status = "AUTHORIZED";
        else state.status = "IDLE";
      } else {
        state.status = "IDLE";
      }
    }

    return state.client;
  }

  public getStatusInfo() {
    return { status: state.status, isConnecting: state.isConnecting };
  }

  public logout() {
    console.log("[Manager] Resetting global state...");
    state.status = "IDLE";
    state.phoneNumber = undefined;
    state.phoneCode = undefined;
    state.phoneCodeHash = undefined;
    // We don't destroy the client, just reset the auth status
  }

  public async sendCode(phone: string) {
    const client = await this.getClient();
    try {
      state.isProcessing = true;
      const result = await client.sendCode({ apiId, apiHash }, phone);
      state.phoneNumber = phone;
      state.phoneCodeHash = result.phoneCodeHash;
      state.status = "CODE_SENT";
    } finally { state.isProcessing = false; }
  }

  public async verifyCode(code: string) {
    const client = await this.getClient();
    try {
      state.isProcessing = true;
      state.phoneCode = code;
      await client.invoke(new Api.auth.SignIn({
        phoneNumber: state.phoneNumber!,
        phoneCodeHash: state.phoneCodeHash!,
        phoneCode: code,
      }));
      await this.finalize();
    } catch (err: any) {
      if (err.errorMessage === "SESSION_PASSWORD_NEEDED") state.status = "WAITING_FOR_2FA";
      else throw err;
    } finally { state.isProcessing = false; }
  }

  private async finalize() {
    const client = await this.getClient();
    if (await client.checkAuthorization()) {
      state.status = "AUTHORIZED";
      if (!initialSessionString) {
        console.log("\n--- [BOOTSTRAP] SUCCESS ---\n" + client.session.save() + "\n--- COPY ABOVE ---\n");
      }
    }
  }
}

export const telegramManager = new TelegramManager();