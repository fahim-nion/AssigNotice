export const NotificationService = {
  // 1. Request user permission
  requestPermission: async () => {
    if (!('Notification' in window)) return false;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },

  // 2. Schedule local reminders for tasks
  // This logic checks for tasks due in the next 24 hours
  scheduleTaskReminders: (tasks: any[]) => {
    if (Notification.permission !== 'granted') return;

    tasks.forEach(task => {
      const deadline = new Date(task.deadline).getTime();
      const now = Date.now();
      
      // Calculate time 1 hour before deadline
      const reminderTime = deadline - (60 * 60 * 1000); 

      if (reminderTime > now) {
        const timeout = reminderTime - now;
        
        // Simple client-side timeout for active sessions
        setTimeout(() => {
          new Notification("Assignment Due Soon", {
            body: `"${task.title}" is due in 1 hour!`,
            icon: 'https://cdn-icons-png.flaticon.com/512/9512/9512313.png'
          });
        }, timeout);
      }
    });
  }
};