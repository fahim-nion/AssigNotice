"use client";

import React, { useState, useEffect } from 'react';
import { OnboardingWizard } from '@/components/onboarding-wizard';
import { AppStorage, MonitoredChannel } from '@/lib/storage';
import { DeadlineWidget } from '@/components/deadline-widget';
import { TaskCard } from '@/components/task-card';
import { SyncStatus } from '@/components/sync-status';
import { NotificationService } from '@/lib/notifications';
import { Settings, Bell, CircleDot, Hash, Loader2, LogOut, Scan } from 'lucide-react';
import { Task } from '@/types';
import { supabase } from '@/lib/supabase';

export default function RootPage() {
  const [isSetup, setIsSetup] = useState<boolean | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [isTelegramConnected, setIsTelegramConnected] = useState<boolean>(false);
  const [channels, setChannels] = useState<MonitoredChannel[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => { init(); }, []);

  const init = async () => {
    const setupState = AppStorage.isSetupComplete();
    const storedChannels = AppStorage.getChannels();
    setIsSetup(setupState);
    setChannels(storedChannels);

    if (setupState) {
      await loadTasks();
      await checkTelegramAuth();
      NotificationService.requestPermission();
    }
  };

  const checkTelegramAuth = async () => {
    try {
      const res = await fetch('/api/telegram/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'GET_STATUS' }),
      });
      const data = await res.json();
      const authed = data.status === 'AUTHORIZED';
      setIsTelegramConnected(authed);
      return authed;
    } catch (err) {
      setIsTelegramConnected(false);
      return false;
    }
  };

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('deadline', { ascending: true });
      if (data) setTasks(data as Task[]);
    } catch (err) {
      console.error("Load Error:", err);
    }
  };

  const handleManualSync = async () => {
    if (isSyncing) return;
    const authed = await checkTelegramAuth();
    if (!authed) { setShowWizard(true); return; }

    setIsSyncing(true);
    try {
      const res = await fetch('/api/telegram/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupIds: channels.map(c => c.id) }),
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

  if (isSetup === null) return null;

  if (!isSetup || showWizard) {
    return <OnboardingWizard onComplete={() => { setShowWizard(false); init(); }} />;
  }

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-background pb-32">
      <header className="px-6 pt-8 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CircleDot className={`h-5 w-5 ${isSyncing ? 'text-blue-500 animate-spin' : 'text-green-500 animate-pulse'}`} />
          <div>
            <h1 className="text-lg font-black uppercase italic">AssigNotice</h1>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
              Monitoring {channels.length} Targets
            </p>
          </div>
        </div>
        <div className="flex gap-2">
           <button onClick={() => { AppStorage.reset(); window.location.reload(); }} className="p-2 hover:bg-red-500/10 text-red-500 rounded-xl transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="px-6 mt-2">
        <SyncStatus isSyncing={isSyncing} lastSync={lastSync} onSync={handleManualSync} isConnected={isTelegramConnected} />
      </div>

      <div className="mt-6">
        <DeadlineWidget selectedDate={new Date()} onDateSelect={() => {}} taskDates={tasks.map(t => t.deadline)} />
      </div>

      <div className="px-6 space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Stream</h2>
          {tasks.length > 0 && (
            <span className="text-[9px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">
              {tasks.filter(t => t.status !== 'completed').length} Pending
            </span>
          )}
        </div>
        
        {tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="p-12 text-center border-2 border-dashed border-muted rounded-3xl">
            <Hash className="mx-auto h-8 w-8 mb-3 opacity-20" />
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No notices parsed yet.</p>
            <button onClick={() => setShowWizard(true)} className="mt-4 text-[10px] font-black text-primary uppercase underline underline-offset-4">
                Configure Monitoring Targets
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6">
        <button 
          onClick={handleManualSync}
          disabled={isSyncing}
          className="w-full bg-primary text-primary-foreground font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          {isSyncing ? (
            <><Loader2 className="animate-spin h-5 w-5" /><span>SYNCING...</span></>
          ) : (
            <><Scan className="h-5 w-5" /><span>SCAN GROUPS FOR TASKS</span></>
          )}
        </button>
      </div>
    </div>
  );
}