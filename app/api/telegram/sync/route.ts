import { NextResponse } from "next/server";
import { getTelegramClient } from "@/lib/telegram/client";

export async function POST() {
    try {
        const client = await getTelegramClient();
        
        // Guard: check if authorized before attempting sync
        const isAuth = await client.checkAuthorization();
        if (!isAuth) {
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        }

        // Use the shared client to fetch dialogues/messages
        const dialogs = await client.getDialogs({});
        // ... rest of your sync logic ...

        return NextResponse.json({ success: true, data: dialogs.length });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}