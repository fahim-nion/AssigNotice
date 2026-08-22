"use client";

import React from 'react';
import { useTheme } from '@/lib/theme-provider';
import { Sun, Moon, Zap, Palette, Check } from 'lucide-react';
import { ThemeType } from '@/types';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeType; icon: React.ElementType; label: string }[] = [
    { id: 'light', icon: Sun, label: 'Minimal' },
    { id: 'dark', icon: Moon, label: 'Slate' },
    { id: 'oled', icon: Zap, label: 'OLED' },
    { id: 'pastel', icon: Palette, label: 'Pastel' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-1">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all ${
              isActive 
                ? 'bg-[hsl(var(--primary))] text-white shadow-sm' 
                : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--background))]'
            }`}
            title={t.label}
          >
            <Icon className="h-4 w-4" />
            {isActive && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-white border border-[hsl(var(--primary))]" />
            )}
          </button>
        );
      })}
    </div>
  );
}