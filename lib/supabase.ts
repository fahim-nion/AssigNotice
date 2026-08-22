import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. DB features will be disabled.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database Schema Recommendation (Run in Supabase SQL Editor):
 * 
 * create table tasks (
 *   id uuid default gen_random_uuid() primary key,
 *   title text not null,
 *   description text,
 *   deadline timestamptz not null,
 *   status text default 'pending',
 *   priority text default 'medium',
 *   source_channel_id text,
 *   source_channel_name text,
 *   created_at timestamptz default now(),
 *   updated_at timestamptz default now()
 * );
 */

export async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('deadline', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function updateTaskStatus(id: string, status: string) {
  const { error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
}