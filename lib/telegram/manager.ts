import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH || "";
const initialSession = process.env.TLGRM_SESSION || "";

export type AuthState = 'IDLE' | 'CODE_SENT' | 'WAITING_FOR_2FA' | 'AUTHORIZED' | 'FLOOD_WAIT';

interface InternalState {
  client: TelegramClient | null;
  status: AuthState;
  phoneNumber?: string;
  phoneCodeHash?: string;
  floodUntil: number;
  isProcessing: boolean; // MUTEX LOCK
}

const globalState = globalThis as unknown as { _tgState: InternalState };
if (!globalState._tgState) {
  globalState._tgState = { 
    client: null, 
    status: 'IDLE', 
    floodUntil: 0,
    isProcessing: false 
  };
}
const state = globalState._tgState;

export class TelegramManager {
  /**
   * LAZY SINGLETON CLIENT
   * Connects only when needed. Reuses connection.
   */
  static async getClient(): Promise<TelegramClient> {
    if (Date.now() < state.floodUntil) {
      const remaining = Math.ceil((state.floodUntil - Date.now()) / 1000);
      throw new Error(`FLOOD_WAIT_${remaining}`);
    }

    if (!state.client) {
      // EXACT NAME: TLGRM_SESSION
      const session = new StringSession(initialSession);
      state.client = new TelegramClient(session, apiId, apiHash, {
        connectionRetries: 5,
      });
    }

    if (!state.client.connected) {
      await state.client.connect();
    }

    // AUTH GUARD: Case C (Existing session)
    if (initialSession && state.status !== 'AUTHORIZED') {
      const authorized = await state.client.checkAuthorization();
      if (authorized) state.status = 'AUTHORIZED';
    }

    return state.client;
  }

  static getStatusInfo() {
    if (Date.now() < state.floodUntil) {
      return { status: 'FLOOD_WAIT', wait: Math.ceil((state.floodUntil - Date.now()) / 1000) };
    }
    return { status: state.status, wait: 0 };
  }

  // --- ATOMIC AUTH TRANSITIONS ---

  static async sendCode(phone: string) {
    if (state.isProcessing) throw new Error("BUSY");
    if (state.status === 'AUTHORIZED') return;
    if (state.status === 'CODE_SENT') return;

    state.isProcessing = true;
    try {
      const client = await this.getClient();
      const result = await client.sendCode({ apiId, apiHash }, phone);
      state.phoneNumber = phone;
      state.phoneCodeHash = result.phoneCodeHash;
      state.status = 'CODE_SENT';
    } catch (err: any) {
      this.handleError(err);
    } finally {
      state.isProcessing = false;
    }
  }

  static async verifyCode(code: string) {
    if (state.isProcessing) throw new Error("BUSY");
    if (state.status !== 'CODE_SENT') throw new Error("INVALID_STATE: SEND_CODE_FIRST");

    state.isProcessing = true;
    try {
      const client = await this.getClient();
      await client.signIn({
        phoneNumber: state.phoneNumber!,
        phoneCodeHash: state.phoneCodeHash!,
        phoneCode: code,
        onError: (err) => { throw err; }
      });
      await this.finalizeAuth();
    } catch (err: any) {
      if (err.errorMessage === "SESSION_PASSWORD_NEEDED") {
        state.status = 'WAITING_FOR_2FA';
      } else {
        this.handleError(err);
      }
    } finally {
      state.isProcessing = false;
    }
  }

  static async verify2FA(password: string) {
    if (state.isProcessing) throw new Error("BUSY");
    if (state.status !== 'WAITING_FOR_2FA') throw new Error("INVALID_STATE: 2FA_NOT_REQUIRED");

    state.isProcessing = true;
    try {
      const client = await this.getClient();
      await client.signIn({
        password: async () => password,
        onError: (err) => { throw err; }
      });
      await this.finalizeAuth();
    } catch (err: any) {
      this.handleError(err);
    } finally {
      state.isProcessing = false;
    }
  }

  private static async finalizeAuth() {
    const client = await this.getClient();
    if (await client.checkAuthorization()) {
      state.status = 'AUTHORIZED';
      // BOOTSTRAP: Only print if env was initially empty
      if (!initialSession) {
        const session = client.session.save() as unknown as string;
        console.log("\n=========================================");
        console.log("TELEGRAM BOOTSTRAP SUCCESSFUL!");
        console.log("COPY THIS INTO YOUR .env FILE:");
        console.log(`TLGRM_SESSION="${session}"`);
        console.log("=========================================\n");
      }
    }
  }

  private static handleError(err: any) {
    if (err.errorMessage?.includes("FLOOD") || err.code === 420) {
      const seconds = err.seconds || 3600;
      state.floodUntil = Date.now() + (seconds * 1000);
      state.status = 'FLOOD_WAIT';
      throw new Error(`FLOOD_WAIT_${seconds}`);
    }
    throw err;
  }
}