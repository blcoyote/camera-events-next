importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing the generated config
// This file is a stub. a proper version will be generated in public and dist folders at build time
const firebaseConfig = {
  apiKey: 'AIzaSyDyAoCl_RFWGwPXw2WjVltlOOZZKJ7rD2g',
  authDomain: 'camera-events-f329e.firebaseapp.com',
  projectId: 'camera-events-f329e',
  storageBucket: 'camera-events-f329e.appspot.com',
  messagingSenderId: '248133674895',
  measurementId: 'G-K05M8JYQTL',
  appId: '1:248133674895:web:9f8c84fc22ac8810e98dfa',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  //TODO: fix next couple of lines
  const notificationTitle = payload.notification.title;
  const notificationUrl = `https://camera-events-next.vercel.app${payload.data.path}/${payload.data.id}`;
  const notificationOptions = {
    body: payload.notification.body,
    actions: [{ action: 'open_page', title: 'Open' }],
    data: { url: notificationUrl },
  };
  self.addEventListener('notificationclick', (event) => {
    const data = event.notification.data;
    event.notification.close();
    self.clients.openWindow(notificationUrl);
  });
  self.registration.showNotification(notificationTitle, notificationOptions);
});
