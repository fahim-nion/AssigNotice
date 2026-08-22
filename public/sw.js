self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Listen for the "Push" event (triggered by the server/database)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { 
    title: 'Deadline Reminder', 
    body: 'You have an assignment due soon!' 
  };

  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/9512/9512313.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/9512/9512313.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Open the app when the notification is clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow(event.notification.data.url);
    })
  );
});