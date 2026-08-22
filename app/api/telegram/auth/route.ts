import { telegramManager } from "@/lib/telegram/manager";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { action, phone, code, password } = await req.json();

    switch (action) {
      case "SEND_CODE":
        await telegramManager.sendCode(phone);
        return NextResponse.json({ status: "CODE_SENT" });
      case "VERIFY_CODE":
        await telegramManager.verifyCode(code);
        return NextResponse.json(telegramManager.getStatusInfo());
      case "VERIFY_2FA":
        await telegramManager.verifyPassword(password);
        return NextResponse.json(telegramManager.getStatusInfo());
      case "GET_STATUS":
        return NextResponse.json(telegramManager.getStatusInfo());
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}