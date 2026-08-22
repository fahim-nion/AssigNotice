import { addDays, format, parse, isValid } from 'date-fns';

export function parseAnnouncement(text: string) {
  if (!text) return null;

  const cleanText = text.toLowerCase();
  
  // 1. Extract potential title (First line or first sentence)
  const titleMatch = text.split('\n')[0].substring(0, 100);

  // 2. Deadline Extraction Logic
  let deadline = new Date();
  deadline.setHours(23, 59, 0, 0); // Default to end of today

  // Pattern: "due on 25/08" or "deadline: Aug 30"
  const dateRegex = /(due|deadline|by|until)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}|tomorrow|\w{3}\s\d{1,2})/i;
  const match = cleanText.match(dateRegex);

  if (match) {
    const dateStr = match[2];
    if (dateStr === 'tomorrow') {
      deadline = addDays(new Date(), 1);
    } else {
      // Basic date parsing (e.g., "Aug 30" or "30/08")
      const currentYear = new Date().getFullYear();
      const parsedDate = new Date(`${dateStr} ${currentYear}`);
      if (isValid(parsedDate)) deadline = parsedDate;
    }
  }

  // 3. Priority Detection
  let priority: 'low' | 'medium' | 'high' = 'medium';
  if (cleanText.includes('urgent') || cleanText.includes('exam') || cleanText.includes('important')) {
    priority = 'high';
  }

  return {
    title: titleMatch || "New Task",
    description: text,
    deadline: deadline.toISOString(),
    priority
  };
}