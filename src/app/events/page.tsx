'use client';

import { useEffect, useMemo, useState } from 'react';
import HomePage from './Homepage';
import { firebaseAuth, firebaseCloudMessaging } from '@/libs/firebase/firebase';
import { postFcmToken } from '@/actions/fcm-actions';

export default function Page() {
  const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const user = firebaseAuth.currentUser;

  firebaseAuth.currentUser?.getIdToken(true).then((token) => {
    setAccessToken(token);
  });

  useEffect(() => {
    if (fcmToken && accessToken) {
      fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v2/fcm?fcm_token=${fcmToken}&token=${accessToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => {
          return result.json;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [fcmToken, accessToken]);

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

  return <HomePage email={user?.email ?? ''} />;
}
