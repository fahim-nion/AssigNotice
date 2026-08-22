export const STORAGE_KEYS = {
  SETUP_COMPLETE: 'assignotice_setup_done',
  TELEGRAM_SESSION: 'assignotice_tele_session',
  CHANNELS: 'assignotice_monitored_channels',
  USER_PREFS: 'assignotice_user_prefs'
};

export interface TeleSession {
  phone?: string;
  connectedAt: string;
  status: 'active' | 'pending';
}

export interface MonitoredChannel {
  id: string;
  name: string;
}

export const AppStorage = {
  isSetupComplete: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.SETUP_COMPLETE) === 'true';
  },

  getChannels: (): MonitoredChannel[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.CHANNELS);
    return data ? JSON.parse(data) : [];
  },

  saveSetup: (session: TeleSession, channels: MonitoredChannel[]) => {
    localStorage.setItem(STORAGE_KEYS.TELEGRAM_SESSION, JSON.stringify(session));
    localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
    localStorage.setItem(STORAGE_KEYS.SETUP_COMPLETE, 'true');
  },

  reset: () => {
    localStorage.removeItem(STORAGE_KEYS.SETUP_COMPLETE);
    localStorage.removeItem(STORAGE_KEYS.TELEGRAM_SESSION);
    localStorage.removeItem(STORAGE_KEYS.CHANNELS);
    window.location.reload();
  }
};