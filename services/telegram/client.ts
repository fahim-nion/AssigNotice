import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0");
const apiHash = process.env.TELEGRAM_API_HASH || "";
const stringSession = new StringSession(process.env.TELEGRAM_SESSION || "");

// Prevents multiple instances during Next.js Hot Reload
let client: TelegramClient;

if (process.env.NODE_ENV === "production") {
  client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
} else {
  if (!(global as any).telegramClient) {
    (global as any).telegramClient = new TelegramClient(
      stringSession,
      apiId,
      apiHash,
      { connectionRetries: 5 }
    );
  }
  client = (global as any).telegramClient;
}

export async function getTelegramClient() {
  if (!client.connected) {
    await client.connect();
  }
  return client;
}