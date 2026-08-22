"use client";

import React from 'react';
import { CheckCircle2, Circle, Clock, MessageSquare, Trash2, Edit3 } from 'lucide-react';
import { Task } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onToggle, onDelete, onEdit }: TaskCardProps) {
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'completed';
  
  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  return (
    <div className={`glass-card p-4 transition-all ${task.status === 'completed' ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <button 
          onClick={() => onToggle(task.id)}
          className="mt-1 text-[hsl(var(--primary))] shrink-0"
        >
          {task.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold leading-tight truncate ${task.status === 'completed' ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-bold ${priorityColors[task.priority]}`}>
              {task.priority.toUpperCase()}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              <span className="truncate max-w-[100px]">{task.sourceChannelName}</span>
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`}>
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(task.deadline), { addSuffix: true })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => onEdit(task)} className="p-1 hover:bg-[hsl(var(--muted))] rounded text-muted-foreground">
            <Edit3 className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1 hover:bg-red-100 text-red-500 rounded">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}