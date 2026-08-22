import { NextRequest, NextResponse } from 'next/server';
import { fetchChannelMessages } from '@/lib/telegram-worker';
import { parseAnnouncement } from '@/lib/telegram-parser';
import { supabase } from '@/lib/supabase';
import { AppStorage } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const { sessionString, channelIds } = await req.json();

    if (!sessionString || !channelIds) {
      return NextResponse.json({ error: 'Missing session or channels' }, { status: 400 });
    }

    let newlyCreatedTasks = 0;

    for (const channelId of channelIds) {
      const messages = await fetchChannelMessages(sessionString, channelId);

      for (const msg of messages) {
        const parsed = parseAnnouncement(msg.text);
        if (!parsed) continue;

        // Check if task already exists (using telegram message id + channel id as a unique check)
        const { data: existing } = await supabase
          .from('tasks')
          .select('id')
          .eq('source_channel_id', channelId)
          .eq('description', parsed.description)
          .single();

        if (!existing) {
          await supabase.from('tasks').insert([{
            title: parsed.title,
            description: parsed.description,
            deadline: parsed.deadline,
            priority: parsed.priority,
            source_channel_id: channelId,
            status: 'pending'
          }]);
          newlyCreatedTasks++;
        }
      }
    }

    return NextResponse.json({ success: true, count: newlyCreatedTasks });
  } catch (error: any) {
    console.error("Sync Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}