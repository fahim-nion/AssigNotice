"use client";

import React, { useMemo } from 'react';
import { format, addDays, isSameDay, startOfToday } from 'date-fns';

interface DeadlineWidgetProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  taskDates: string[]; // ISO strings
}

export function DeadlineWidget({ selectedDate, onDateSelect, taskDates }: DeadlineWidgetProps) {
  const days = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));
  }, []);

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-3 px-4">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const hasTask = taskDates.some(td => isSameDay(new Date(td), day));
          const isToday = isSameDay(day, startOfToday());

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`flex min-w-[60px] flex-col items-center justify-center rounded-2xl py-3 transition-all ${
                isSelected 
                  ? 'bg-[hsl(var(--primary))] text-white shadow-lg scale-105' 
                  : 'bg-[hsl(var(--card))] border border-[hsl(var(--border))]'
              }`}
            >
              <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                {format(day, 'EEE')}
              </span>
              <span className="text-lg font-bold">{format(day, 'd')}</span>
              {hasTask && !isSelected && (
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              )}
              {isToday && !isSelected && (
                 <span className="text-[10px] font-medium mt-1">Today</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}