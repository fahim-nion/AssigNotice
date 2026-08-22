import { MonitoredChannel } from './storage';

/**
 * This file acts as the Client-Side Bridge.
 * It talks to our Next.js API routes which then talk to the TelegramManager.
 */

export const TelegramAPI = {
  // Step 1: Request OTP from Server
  sendCode: async (phone: string) => {
    const res = await fetch('/api/telegram/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'SEND_CODE', phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send code');
    return data; // Returns { status: "CODE_SENT" }
  },

  // Step 2: Verify the 5-digit code
  verifyCode: async (code: string) => {
    const res = await fetch('/api/telegram/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'VERIFY_CODE', code }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verification failed');
    return data; // Returns { status: "AUTHORIZED" } or { status: "WAITING_FOR_2FA" }
  },

  // Step 3: Handle 2FA Password if needed
  verifyPassword: async (password: string) => {
    const res = await fetch('/api/telegram/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'VERIFY_2FA', password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '2FA Verification failed');
    return data;
  },

  // Step 4: Fetch actual chats (Trigger Sync)
  fetchUserChats: async (): Promise<MonitoredChannel[]> => {
    const res = await fetch('/api/telegram/sync', { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch chats');
    
    // Ensure this matches your MonitoredChannel interface
    return data.chats || [];
  }
};

/**
 * BUILD FIX: These functions were missing and causing your 'npm run build' to fail.
 * They are used by the worker to process messages.
 */

export function parseAssignmentMessage(message: string, date: number) {
  const keywords = ["assignment", "deadline", "submission", "due", "quiz", "ct"];
  const lowerText = message.toLowerCase();
  
  const isMatch = keywords.some(k => lowerText.includes(k));
  
  if (!isMatch) return null;

  return {
    courseCode: "Detected Notice", // You can add logic to extract real course codes here
    dueDate: new Date(date * 1000).toISOString(),
    content: message,
  };
}

// Added to satisfy the import in webhook/route.ts if needed
export function parseTelegramMessage(message: any) {
    return parseAssignmentMessage(message.text || "", message.date);
}