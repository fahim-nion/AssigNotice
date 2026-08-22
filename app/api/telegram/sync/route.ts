import { NextResponse } from "next/server";
import { telegramManager } from "@/lib/telegram/manager";
import { getAvailableChats, syncAssignments } from "@/lib/telegram-worker";

export async function GET() {
  try {
    console.log("[API] GET /sync - Fetching chats...");
    const chats = await getAvailableChats();
    return NextResponse.json({ chats });
  } catch (error: any) {
    console.error("[API Error] GET /sync:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const groupIds = body.groupIds || [];
    
    console.log(`[API] POST /sync - Scanning ${groupIds.length} groups`);
    const tasks = await syncAssignments(groupIds);
    
    return NextResponse.json({ success: true, count: tasks.length });
  } catch (error: any) {
    console.error("[API Error] POST /sync:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}