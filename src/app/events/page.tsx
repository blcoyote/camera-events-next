'use client';

import { useEffect, useState } from 'react';
import HomePage from './Homepage';
import { firebaseAuth, firebaseCloudMessaging } from '@/libs/firebase/firebase';

export default function Home() {
  const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);

  const getToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init();
      if (token) {
        await firebaseCloudMessaging.getMessage();
        setFcmToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => console.log('Service Worker registration successful with scope: ', registration.scope))
      .catch((err) => console.log('Service Worker registration failed: ', err));
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) =>
        console.log('event for the service worker', event)
      );
    }
    async function setToken() {
      await getToken();
    }
    setToken();
  }, []);

  const user = firebaseAuth.currentUser;
  const token = firebaseAuth.currentUser?.getIdToken();

  return <HomePage email={user?.email ?? ''} />;
}
