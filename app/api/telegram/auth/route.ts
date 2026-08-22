import { NextRequest, NextResponse } from 'next/server';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { errors } from 'telegram'; // Import Telegram errors

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH || '';

export async function POST(req: NextRequest) {
  const { action, phone, code, phoneCodeHash, sessionString } = await req.json();

  try {
    const session = new StringSession(sessionString || "");
    const client = new TelegramClient(session, apiId, apiHash, { 
        connectionRetries: 5,
        deviceModel: "AssigNotice Web App" 
    });
    
    await client.connect();

    if (action === 'SEND_CODE') {
      const result = await client.sendCode({ apiId, apiHash }, phone);
      return NextResponse.json({ phoneCodeHash: result.phoneCodeHash });
    }

    if (action === 'VERIFY_CODE') {
      await client.signInUser({ apiId, apiHash }, {
        phoneNumber: phone,
        phoneCode: async () => code,
        phoneCodeHash: phoneCodeHash,
      });
      const newSessionString = client.session.save() as unknown as string;
      return NextResponse.json({ session: newSessionString });
    }

    if (action === 'FETCH_CHANNELS') {
      const dialogs = await client.getDialogs({});
      const channels = dialogs
        .filter(d => d.isChannel || d.isGroup)
        .map(d => ({ id: d.id?.toString(), name: d.title }));
      return NextResponse.json({ channels });
    }

    return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });

  } catch (error: any) {
    // SPECIAL HANDLING FOR FLOOD ERRORS
    if (error instanceof errors.FloodWaitError) {
      return NextResponse.json({ 
        error: `Telegram limits reached. Please wait ${Math.round(error.seconds / 60)} minutes before trying again.`,
        isFlood: true,
        waitTime: error.seconds
      }, { status: 420 });
    }

    console.error('Telegram Auth Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}