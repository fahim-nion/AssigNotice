export type ThemeType = 'light' | 'dark' | 'oled' | 'pastel';

export type TaskStatus = 'pending' | 'completed' | 'overdue';

export type Priority = 'low' | 'medium' | 'high';

export interface TelegramMessage {
  id: string;
  telegramId: number;
  channelId: string;
  channelName: string;
  rawText: string;
  dateSent: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: string; 
  status: TaskStatus;
  priority: Priority;
  sourceChannelId: string;
  sourceChannelName: string;
  notificationLeadTime: number; 
  createdAt: string;
  updatedAt: string;
  isSynced: boolean;
}

export interface UserPreferences {
  theme: ThemeType;
  notificationsEnabled: boolean;
  defaultLeadTime: number;
  monitoredChannels: string[];
}

export interface NotificationPayload {
  title: string;
  body: string;
  taskId: string;
  icon?: string;
  badge?: string;
}