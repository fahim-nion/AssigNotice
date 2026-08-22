"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Check, RefreshCcw } from 'lucide-react';
import { AppStorage, MonitoredChannel } from '@/lib/storage';

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'phone' | 'code' | 'select'>('phone');
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [availableChats, setAvailableChats] = useState<MonitoredChannel[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/telegram/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'GET_STATUS' }),
      });
      const data = await res.json();
      if (data.status === 'AUTHORIZED') {
        fetchChats();
      } else {
        setLoading(false);
        setStep('phone');
      }
    } catch (e) { setLoading(false); }
  };

  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/telegram/sync');
      const data = await res.json();
      if (data.chats && data.chats.length > 0) {
        setAvailableChats(data.chats);
        setStep('select');
      } else {
        setError("No groups found. Try resetting.");
      }
    } catch (err) { setError("Failed to fetch groups."); }
    finally { setLoading(false); }
  };

  const handleReset = async () => {
    setLoading(true);
    await fetch('/api/telegram/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'LOGOUT' }),
    });
    setStep('phone');
    setLoading(false);
    setError(null);
  };

  const handleSendCode = async () => {
    setLoading(true);
    const res = await fetch('/api/telegram/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'SEND_CODE', phone }),
    });
    const data = await res.json();
    if (data.status === 'CODE_SENT') setStep('code');
    else setError(data.error);
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    const res = await fetch('/api/telegram/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'VERIFY_CODE', code }),
    });
    const data = await res.json();
    if (data.status === 'AUTHORIZED') fetchChats();
    else setError(data.error);
    setLoading(false);
  };

  const handleFinish = () => {
    const finalChannels = availableChats.filter(c => selectedIds.includes(c.id));
    AppStorage.saveSetup({ phone: "Active", connectedAt: new Date().toISOString(), status: 'active' }, finalChannels);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card p-8 rounded-3xl border-2 border-border shadow-2xl">
        {loading ? (
          <div className="flex flex-col items-center py-10 gap-4">
             <Loader2 className="animate-spin h-10 w-10 text-primary" />
             <p className="text-xs font-black uppercase animate-pulse">Syncing...</p>
             <button onClick={handleReset} className="text-[10px] uppercase underline opacity-50">Force Reset</button>
          </div>
        ) : step === 'select' ? (
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase">Select Groups</h2>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {availableChats.map(chat => (
                <div key={chat.id} onClick={() => setSelectedIds(prev => prev.includes(chat.id) ? prev.filter(i => i !== chat.id) : [...prev, chat.id])}
                  className={`p-4 rounded-xl border-2 cursor-pointer ${selectedIds.includes(chat.id) ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <span className="font-bold text-sm truncate block">{chat.name}</span>
                </div>
              ))}
            </div>
            <button onClick={handleFinish} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black">MONITOR</button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase">{step === 'phone' ? 'Login' : 'Enter Code'}</h2>
            {error && <p className="text-[10px] text-red-500">{error}</p>}
            <input type="text" value={step === 'phone' ? phone : code} onChange={e => step === 'phone' ? setPhone(e.target.value) : setCode(e.target.value)} 
                   className="w-full p-4 rounded-xl bg-muted" placeholder={step === 'phone' ? '+880...' : '5-digit code'} />
            <button onClick={step === 'phone' ? handleSendCode : handleVerifyCode} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black">CONTINUE</button>
            <button onClick={handleReset} className="w-full text-[10px] uppercase opacity-50">Reset Setup</button>
          </div>
        )}
      </div>
    </div>
  );
}