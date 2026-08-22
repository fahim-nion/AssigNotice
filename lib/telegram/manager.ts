import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH || "";
const sessionString = process.env.TELEGRAM_SESSION || ""; // Using your env name

export type AuthState = 'IDLE' | 'CODE_SENT' | 'WAITING_FOR_2FA' | 'AUTHORIZED' | 'FLOOD_WAIT';

interface TelegramGlobalState {
    client: TelegramClient | null;
    status: AuthState;
    phoneNumber?: string;
    phoneCodeHash?: string;
    floodUntil: number;
}

// Singleton survival for Next.js Hot Reload
const globalState = globalThis as unknown as { _tgState: TelegramGlobalState };
if (!globalState._tgState) {
    globalState._tgState = { client: null, status: 'IDLE', floodUntil: 0 };
}
const state = globalState._tgState;

export const TelegramManager = {
    async getClient(): Promise<TelegramClient> {
        // 1. Local FloodWait Check
        if (Date.now() < state.floodUntil) {
            const seconds = Math.ceil((state.floodUntil - Date.now()) / 1000);
            throw new Error(`FLOOD_WAIT_${seconds}`);
        }

        // 2. Singleton Initialization
        if (!state.client) {
            const session = new StringSession(sessionString);
            state.client = new TelegramClient(session, apiId, apiHash, {
                connectionRetries: 5,
                useWSS: true
            });
        }

        if (!state.client.connected) {
            await state.client.connect();
        }

        // 3. Auto-Authorized check if session string exists in .env
        if (sessionString && state.status !== 'AUTHORIZED') {
            const isAuth = await state.client.checkAuthorization();
            if (isAuth) state.status = 'AUTHORIZED';
        }

        return state.client;
    },

    getStatus() {
        if (Date.now() < state.floodUntil) return 'FLOOD_WAIT';
        return state.status;
    },

    async sendCode(phone: string) {
        if (state.status === 'CODE_SENT') return { status: 'CODE_SENT' };
        const client = await this.getClient();
        try {
            const result = await client.sendCode({ apiId, apiHash }, phone);
            state.phoneNumber = phone;
            state.phoneCodeHash = result.phoneCodeHash;
            state.status = 'CODE_SENT';
            return { status: 'CODE_SENT' };
        } catch (err: any) {
            this.handleError(err);
        }
    },

    async verifyCode(code: string) {
        const client = await this.getClient();
        try {
            await client.signIn({
                phoneNumber: state.phoneNumber!,
                phoneCodeHash: state.phoneCodeHash!,
                phoneCode: code,
                onError: (err) => { throw err; }
            });
            return await this.finalizeAuth();
        } catch (err: any) {
            if (err.errorMessage === "SESSION_PASSWORD_NEEDED") {
                state.status = 'WAITING_FOR_2FA';
                return { status: 'WAITING_FOR_2FA' };
            }
            this.handleError(err);
        }
    },

    async verify2FA(password: string) {
        const client = await this.getClient();
        try {
            await client.signIn({
                password: async () => password,
                onError: (err) => { throw err; }
            });
            return await this.finalizeAuth();
        } catch (err: any) {
            this.handleError(err);
        }
    },

    async finalizeAuth() {
        const client = await this.getClient();
        const isAuth = await client.checkAuthorization();
        if (isAuth) {
            state.status = 'AUTHORIZED';
            const session = client.session.save() as unknown as string;
            
            // BOOTSTRAP LOG - ONLY PRINTS ONCE ON FIRST SUCCESS
            console.log("\n--- TELEGRAM BOOTSTRAP SUCCESSFUL ---");
            console.log("Copy this string to your .env file:");
            console.log(`TELEGRAM_SESSION="${session}"`);
            console.log("--------------------------------------\n");
            
            return { status: 'AUTHORIZED' };
        }
        return { status: 'IDLE' };
    },

    handleError(err: any) {
        if (err.errorMessage?.includes("FLOOD")) {
            state.floodUntil = Date.now() + (err.seconds * 1000);
            state.status = 'FLOOD_WAIT';
            throw new Error(`FLOOD_WAIT_${err.seconds}`);
        }
        throw err;
    }
};