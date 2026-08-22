import { NextResponse } from "next/server";
import { TelegramManager } from "@/lib/telegram/manager";

export async function POST(req: Request) {
    try {
        const { action, phone, code, password } = await req.json();

        switch (action) {
            case 'SEND_CODE':
                return NextResponse.json(await TelegramManager.sendCode(phone));
            case 'VERIFY_CODE':
                return NextResponse.json(await TelegramManager.verifyCode(code));
            case 'VERIFY_2FA':
                return NextResponse.json(await TelegramManager.verify2FA(password));
            case 'GET_STATUS':
                return NextResponse.json({ status: TelegramManager.getStatus() });
            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error: any) {
        const status = error.message.startsWith('FLOOD_WAIT') ? 420 : 400;
        return NextResponse.json({ error: error.message }, { status });
    }
}