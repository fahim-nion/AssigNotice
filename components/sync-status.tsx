"use client";
import { useEffect, useState } from "react";
import { Cloud, CloudOff, RefreshCw } from "lucide-react";

export function SyncStatus() {
  const [status, setStatus] = useState<string>("LOADING");

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/telegram/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'GET_STATUS' })
      });
      const data = await res.json();
      setStatus(data.status);
    } catch {
      setStatus("DISCONNECTED");
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  if (status === "AUTHORIZED") {
    return (
      <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
        <Cloud size={16} /> Connected
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-red-500 font-bold bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 animate-pulse">
      <CloudOff size={16} /> Reconnect Required
    </div>
  );
}