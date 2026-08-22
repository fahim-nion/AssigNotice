import { NextResponse } from 'next/server';
import { parseTelegramMessage } from '@/lib/telegram-parser';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate Telegram Webhook Secret (Recommended for production)
    // const token = request.headers.get('X-Telegram-Bot-Api-Secret-Token');

    const message = body.message || body.channel_post;
    if (!message || !message.text) {
      return NextResponse.json({ status: 'ignored' });
    }

    const { title, deadline, priority, description } = parseTelegramMessage(message.text);

    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        title,
        deadline,
        priority,
        description,
        source_channel_name: message.chat.title || "Telegram",
        source_channel_id: message.chat.id.toString(),
        status: 'pending'
      }])
      .select();

    if (error) throw error;

    return NextResponse.json({ status: 'success', task: data[0] });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}