import { NextResponse } from "next/server";
import { TelegramManager } from "@/lib/telegram/manager";
import { syncAssignments } from "@/lib/telegram-worker"; // Using existing worker logic

export async function POST() {
  try {
    const client = await TelegramManager.getClient();
    if (TelegramManager.getStatus() !== 'AUTHORIZED') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // CALLS REAL LOGIC: Not a placeholder
    const result = await syncAssignments(client);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}