"use client";

import React from 'react';
import { LogOut } from 'lucide-react';
import { AppStorage } from '@/lib/storage';

export function LogoutButton() {
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out and clear all sync settings?")) {
      // 1. Clear LocalStorage
      AppStorage.reset();
      // 2. Clear Telegram Session from local memory
      localStorage.removeItem('tg_session');
      // 3. Force redirect to onboarding
      window.location.reload();
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Logout Account
    </button>
  );
}