import { NextResponse } from "next/server";
import { TelegramManager } from "@/lib/telegram/manager";

export async function POST() {
    try {
        const client = await TelegramManager.getClient();
        
        // Safety check
        if (!(await client.checkAuthorization())) {
            return NextResponse.json({ error: "Session expired or unauthorized" }, { status: 401 });
        }

        // Proceed with shared client instance
        const dialogs = await client.getDialogs({ limit: 10 });
        // Add your channel fetching / assignment logic here...

        return NextResponse.json({ success: true, count: dialogs.length });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}