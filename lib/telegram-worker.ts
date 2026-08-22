import { telegramManager } from "./telegram/manager";
import { Api } from "telegram";
import { supabase } from "./supabase";

export async function getAvailableChats() {
  const client = await telegramManager.getClient();
  // Fetch more dialogs to be safe
  const dialogs = await client.getDialogs({ limit: 100 });
  
  const uniqueChats = new Map();

  for (const d of dialogs) {
    if (d.entity && (d.isGroup || d.isChannel)) {
      // GramJS uses BigInt IDs. Use peerId helper for consistency.
      const idStr = d.id?.toString();
      if (idStr && !uniqueChats.has(idStr)) {
        uniqueChats.set(idStr, {
          id: idStr,
          name: d.title || "Untitled Group",
        });
      }
    }
  }

  const result = Array.from(uniqueChats.values());
  console.log(`[Worker] Found ${result.length} unique groups/channels.`);
  return result;
}

export async function syncAssignments(selectedGroupIds: string[]) {
  const client = await telegramManager.getClient();
  const allParsedTasks: any[] = [];

  // Deduplicate incoming IDs just in case
  const uniqueIds = Array.from(new Set(selectedGroupIds));

  for (const chatId of uniqueIds) {
    try {
      console.log(`[Worker] Deep scanning: ${chatId}`);
      const messages = await client.getMessages(chatId, { limit: 100 });
      
      for (const msg of messages) {
        if (!msg.message) continue;
        
        const parsed = parseMessageContent(msg.message, msg.date);
        
        if (parsed) {
          allParsedTasks.push({
            telegram_id: `${chatId}_${msg.id}`, 
            title: parsed.title,
            deadline: parsed.deadline,
            content: msg.message,
            status: 'pending',
            group_id: chatId
          });
        }
      }
    } catch (e: any) {
      console.error(`[Worker] Error scanning ${chatId}:`, e.message);
    }
  }

  if (allParsedTasks.length > 0) {
    const { error } = await supabase
      .from('tasks')
      .upsert(allParsedTasks, { onConflict: 'telegram_id' });
    if (error) console.error("[Supabase Error]", error.message);
  }

  return allParsedTasks;
}

/**
 * ULTRA-AGGRESSIVE PARSER
 * If it contains academic keywords OR specific formatting, we grab it.
 */
function parseMessageContent(text: string, timestamp: number) {
  const lower = text.toLowerCase();
  
  // Very broad keywords to ensure nothing is missed
  const keywords = [
    "assignment", "quiz", "deadline", "submission", "due", "postpone",
    "ct", "test", "exam", "midterm", "final", "project", "report", 
    "viva", "presentation", "task", "homework", "link", "form", "google"
  ];
  
  const hasKeyword = keywords.some(k => lower.includes(k));
  
  // Also check for common "Notice" patterns like all caps headers
  const firstLine = text.split('\n')[0];
  const isHeader = firstLine === firstLine.toUpperCase() && firstLine.length > 5;

  if (!hasKeyword && !isHeader) return null;

  let title = firstLine.replace(/[#*`_]/g, '').trim();
  if (title.length > 60) title = title.substring(0, 57) + "...";
  
  // Improved Date Regex
  const dateRegex = /(\d{1,2})[\/\-\. ](\d{1,2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)([\/\-\. ](\d{2,4}))?/i;
  const dateMatch = text.match(dateRegex);
  
  // Default: Message Date + 3 days
  let deadline = new Date(timestamp * 1000 + (3 * 24 * 60 * 60 * 1000)).toISOString();

  if (dateMatch) {
    try {
      const foundDate = new Date(dateMatch[0]);
      if (!isNaN(foundDate.getTime())) {
          deadline = foundDate.toISOString();
      }
    } catch (e) {}
  }

  return { title, deadline };
}