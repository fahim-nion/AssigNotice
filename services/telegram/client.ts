import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH || "";
const sessionString = process.env.TLGRM_SESSION || "";

// Maintain singleton in development to survive hot-reloads
let client: TelegramClient | null = null;
let floodUntil: number = 0;
let loginLock = false;

export async function getTelegramClient() {
    // 1. Check FloodWait
    if (Date.now() < floodUntil) {
        const remaining = Math.ceil((floodUntil - Date.now()) / 1000);
        throw new Error(`FLOOD_WAIT_${remaining}`);
    }

    // 2. Initialize Singleton
    if (!client) {
        const session = new StringSession(sessionString);
        client = new TelegramClient(session, apiId, apiHash, {
            connectionRetries: 5,
        });
    }

    if (!client.connected) {
        await client.connect();
    }

    return client;
}

export function setFloodWait(seconds: number) {
    floodUntil = Date.now() + seconds * 1000;
}

export function isLoggingIn() { return loginLock; }
export function setLoggingIn(val: boolean) { loginLock = val; }