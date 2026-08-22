"use client";

import React from 'react';
import { RefreshCcw, Wifi, WifiOff } from 'lucide-react';

interface SyncStatusProps {
  isSyncing: boolean;
  lastSync: Date | null;
  onSync: () => void;
  isConnected: boolean;
}

export function SyncStatus({ isSyncing, lastSync, onSync, isConnected }: SyncStatusProps) {
  return (
    <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isConnected ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          {isConnected ? (
            <Wifi className="h-5 w-5 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500" />
          )}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
            {isConnected ? 'Telegram Connected' : 'Connection Lost'}
          </p>
          <p className="text-sm font-bold">{isConnected ? 'Live Bridge Active' : 'Reconnect Required'}</p>
        </div>
      </div>
      
      <button 
        onClick={onSync}
        disabled={isSyncing || !isConnected}
        className="flex flex-col items-end group disabled:opacity-50"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
          <RefreshCcw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'SYNCING...' : `LAST: ${lastSync ? lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'NEVER'}`}
        </div>
        <span className="text-[9px] opacity-50 uppercase tracking-tighter">Force Update</span>
      </button>
    </div>
  );
}