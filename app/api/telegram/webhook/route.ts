import { parseTelegramMessage } from "@/lib/telegram-api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Process the incoming update
    const update = parseTelegramMessage(body);
    
    if (update) {
      console.log("[Webhook] Received relevant update:", update.courseCode);
      // ... your logic to handle new assignments via webhook ...
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Webhook] Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}