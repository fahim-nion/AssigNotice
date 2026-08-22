"use client";

import React, { useState } from 'react';
import { Task, Priority } from '@/types';
import { X } from 'lucide-react';

interface TaskEditModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Partial<Task>) => void;
}

export function TaskEditModal({ task, isOpen, onClose, onSave }: TaskEditModalProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [deadline, setDeadline] = useState(task?.deadline ? task.deadline.slice(0, 16) : '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'medium');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-[hsl(var(--muted))] rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Task Title</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Deadline</label>
            <input 
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Priority</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                    priority === p 
                      ? 'bg-[hsl(var(--primary))] text-white' 
                      : 'bg-[hsl(var(--muted))] border border-[hsl(var(--border))]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onSave({ title, deadline: new Date(deadline).toISOString(), priority })}
            className="w-full bg-[hsl(var(--primary))] text-white font-bold py-4 rounded-2xl mt-4 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}