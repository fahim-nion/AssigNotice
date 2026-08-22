"use client";

import React, { useState } from 'react';
import { Send, KeyRound, Loader2, Check, LogOut } from 'lucide-react';
import { AppStorage, MonitoredChannel } from '@/lib/storage';

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'phone' | 'code' | 'select'>('phone');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneCodeHash, setPhoneCodeHash] = useState('');
  const [availableChats, setAvailableChats] = useState<MonitoredChannel[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const apiCall = async (body: object) => {
    const res = await fetch('/api/telegram/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  const handleSendCode = async () => {
    setLoading(true);
    const data = await apiCall({ action: 'SEND_CODE', phone });
    if (data.phoneCodeHash) {
      setPhoneCodeHash(data.phoneCodeHash);
      setStep('code');
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    const data = await apiCall({ action: 'VERIFY_CODE', phone, code, phoneCodeHash });
    if (data.session) {
      localStorage.setItem('tg_session', data.session);
      const chatData = await apiCall({ action: 'FETCH_CHANNELS', sessionString: data.session });
      setAvailableChats(chatData.channels || []);
      setStep('select');
    }
    setLoading(false);
  };

  const handleFinish = () => {
    const finalChannels = availableChats.filter(c => selectedIds.includes(c.id));
    AppStorage.saveSetup({ phone, connectedAt: new Date().toISOString(), status: 'active' }, finalChannels);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[hsl(var(--background))] flex items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-md bg-[hsl(var(--card))] p-8 rounded-3xl border border-[hsl(var(--border))] shadow-2xl">
        {step === 'phone' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black">Telegram Login</h2>
            <input 
              type="tel" placeholder="+1234567890" 
              className="w-full p-4 rounded-xl bg-[hsl(var(--muted))] border-none outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
              value={phone} onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleSendCode} disabled={loading} className="w-full bg-[hsl(var(--primary))] text-white py-4 rounded-xl font-bold flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Request Login Code"}
            </button>
          </div>
        )}

        {step === 'code' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black">Enter Code</h2>
            <input 
              type="text" placeholder="5-digit code" 
              className="w-full p-4 rounded-xl bg-[hsl(var(--muted))] text-center text-2xl tracking-[0.5em] font-bold"
              value={code} onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerifyCode} disabled={loading} className="w-full bg-[hsl(var(--primary))] text-white py-4 rounded-xl font-bold flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
            </button>
          </div>
        )}

        {step === 'select' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black">Select Monitoring Targets</h2>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {availableChats.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => setSelectedIds(prev => prev.includes(chat.id) ? prev.filter(i => i !== chat.id) : [...prev, chat.id])}
                  className={`p-4 rounded-xl border cursor-pointer flex justify-between ${selectedIds.includes(chat.id) ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))/0.1]' : 'border-[hsl(var(--border))]'}`}
                >
                  <span className="font-bold truncate">{chat.name}</span>
                  {selectedIds.includes(chat.id) && <Check className="text-[hsl(var(--primary))]" />}
                </div>
              ))}
            </div>
            <button onClick={handleFinish} className="w-full bg-[hsl(var(--primary))] text-white py-4 rounded-xl font-bold">
              Finish Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}