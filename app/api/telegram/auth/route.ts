import { telegramManager } from "@/lib/telegram/manager";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { action, phone, code } = await req.json();

    if (action === "GET_STATUS") {
      return NextResponse.json(telegramManager.getStatusInfo());
    }

    if (action === "LOGOUT") {
      telegramManager.logout();
      return NextResponse.json({ status: "IDLE" });
    }

    if (action === "SEND_CODE") {
      await telegramManager.sendCode(phone);
      return NextResponse.json({ status: "CODE_SENT" });
    }

    if (action === "VERIFY_CODE") {
      await telegramManager.verifyCode(code);
      return NextResponse.json(telegramManager.getStatusInfo());
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}