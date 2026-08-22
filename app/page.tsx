"use client";

import React, { useState, useEffect } from 'react';
import { OnboardingWizard } from '@/components/onboarding-wizard';
import { AppStorage, MonitoredChannel } from '@/lib/storage';
import { DeadlineWidget } from '@/components/deadline-widget';
import { TaskCard } from '@/components/task-card';
import { SyncStatus } from '@/components/sync-status';
import { NotificationService } from '@/lib/notifications'; // Added this
import { Settings, Bell, CircleDot, Hash, Loader2, LogOut } from 'lucide-react';
import { Task } from '@/types';
import { supabase } from '@/lib/supabase';

export default function RootPage() {
  const [isSetup, setIsSetup] = useState<boolean | null>(null);
  const [channels, setChannels] = useState<MonitoredChannel[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // 1. Initial Load & Setup Check
  useEffect(() => {
    const setupState = AppStorage.isSetupComplete();
    setIsSetup(setupState);
    if (setupState) {
      setChannels(AppStorage.getChannels());
      loadTasks();
      
      // Request Notification Permission on entry
      NotificationService.requestPermission();
    }
  }, []);

  // 2. Schedule Reminders whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      NotificationService.scheduleTaskReminders(tasks);
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('deadline', { ascending: true });
      
      if (error) throw error;
      if (data) setTasks(data);
    } catch (err) {
      console.error("Supabase Load Error:", err);
    }
  };

  const handleManualSync = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    try {
      const sessionString = localStorage.getItem('tg_session');
      const channelIds = channels.map(c => c.id);

      const res = await fetch('/api/telegram/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionString, channelIds }),
      });

      const result = await res.json();
      if (result.success) {
        setLastSync(new Date());
        await loadTasks(); 
      }
    } catch (err) {
      console.error("Sync Failed", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Logout of AssigNotice? This will clear your Telegram session.")) {
      AppStorage.reset();
      localStorage.removeItem('tg_session');
      window.location.reload();
    }
  };

  if (isSetup === null) return null;

  if (!isSetup) {
    return <OnboardingWizard onComplete={() => window.location.reload()} />;
  }

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-[hsl(var(--background))] pb-32 animate-in fade-in duration-700">
      <header className="px-6 pt-8 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CircleDot className={`h-5 w-5 ${isSyncing ? 'text-blue-500 animate-spin' : 'text-green-500 animate-pulse'}`} />
          <div>
            <h1 className="text-lg font-black uppercase">AssigNotice</h1>
            <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-tighter">
              Monitoring {channels.length} Telegram Groups
            </p>
          </div>
        </div>
        <div className="flex gap-1">
           <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors" title="Logout">
            <LogOut className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-[hsl(var(--muted))] rounded-full">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="px-6 mt-2">
        <SyncStatus 
          isSyncing={isSyncing} 
          lastSync={lastSync} 
          onSync={handleManualSync} 
          isConnected={!!localStorage.getItem('tg_session')}
        />
      </div>

      <div className="mt-6">
        <DeadlineWidget 
          selectedDate={new Date()} 
          onDateSelect={() => {}} 
          taskDates={tasks.map(t => t.deadline)} 
        />
      </div>

      <div className="px-6 space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Assignment Stream</h2>
          {tasks.length > 0 && (
            <span className="text-[10px] font-bold bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
              {tasks.filter(t => t.status !== 'completed').length} Pending
            </span>
          )}
        </div>
        
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggle={() => {}} // CRUD logic in lib/supabase.ts
              onDelete={() => {}} 
              onEdit={() => {}} 
            />
          ))
        ) : (
          <div className="glass-card p-12 text-center border-dashed border-2">
            <Hash className="mx-auto h-10 w-10 mb-3 opacity-20" />
            <p className="text-sm font-bold text-muted-foreground">No notices parsed yet.</p>
            <p className="text-[10px] uppercase mt-1 opacity-50">Try scanning your groups below</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6">
        <button 
          onClick={handleManualSync}
          disabled={isSyncing}
          className="group w-full bg-[hsl(var(--foreground))] text-[hsl(var(--background))] font-black py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          {isSyncing ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>SYNCING TELEGRAM...</span>
            </>
          ) : (
            <>
              <Bell className="h-5 w-5 group-hover:animate-bounce" />
              <span>SCAN GROUPS FOR TASKS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}