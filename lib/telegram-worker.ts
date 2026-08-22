import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH || "";

export async function fetchChannelMessages(sessionString: string, channelId: string) {
  const session = new StringSession(sessionString);
  const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });
  
  await client.connect();
  
  // Fetch messages from the specific channel/group
  const result = await client.getMessages(channelId, {
    limit: 15,
  });

  await client.disconnect();
  
  return result.map(m => ({
    id: m.id.toString(),
    text: m.message,
    date: m.date,
    channelId: channelId
  }));
}