"use client";

import React, { useEffect, useState } from 'react';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { ThemeSwitcher } from './theme-switcher';

export function Navbar() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerManualSync = () => {
    setIsSyncing(true);
    // Sync logic will be implemented in Phase 4
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/80] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-white font-bold">
            A
          </div>
          <span className="text-xl font-bold tracking-tight">AssigNotice</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            {isOnline ? (
              <Cloud className="h-4 w-4 text-green-500" />
            ) : (
              <CloudOff className="h-4 w-4 text-red-500" />
            )}
            <button 
              onClick={triggerManualSync}
              className={`p-1 hover:bg-[hsl(var(--muted))] rounded-full transition-all ${isSyncing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}