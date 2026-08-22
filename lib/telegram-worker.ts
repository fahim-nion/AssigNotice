import { TelegramManager } from "./telegram/manager";
import { supabase } from "./supabase"; // Existing DB client
import { parseAssignmentMessage } from "./telegram-api"; // PRESERVED: Your regex/parsing logic

export async function runAssignmentSync() {
  const client = await TelegramManager.getClient();
  const { status } = TelegramManager.getStatusInfo();

  if (status !== 'AUTHORIZED') {
    throw new Error("UNAUTHORIZED_SYNC_ATTEMPT");
  }

  // PRESERVED: Real monitored channels from your config
  const channelList = process.env.MONITORED_CHANNELS?.split(",") || [];

  for (const channelId of channelList) {
    const trimmedId = channelId.trim();
    // Reusing the same authenticated socket
    const messages = await client.getMessages(trimmedId, { limit: 15 });

    for (const msg of messages) {
      if (!msg.message) continue;

      // PRESERVED: Actual AssigNotice filtering and parsing
      const assignment = parseAssignmentMessage(msg.message, msg.date);
      
      if (assignment) {
        // PRESERVED: Database upsert logic
        await supabase.from('assignments').upsert({
          id: `${trimmedId}_${msg.id}`,
          content: msg.message,
          due_date: assignment.dueDate,
          course: assignment.courseCode,
        });
      }
    }
  }
}