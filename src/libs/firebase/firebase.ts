import { clientConfig } from '@/config';
import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localStorage.getItem('fcm_token');
  },
  //initializing firebase app
  init: async function () {
    try {
      const tokenInLocalForage = await this.tokenInlocalforage();
      //if FCM token is already there just return the token
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }
      const messaging = getMessaging();
      const status = await window.Notification.requestPermission();
      if (status && status === 'granted') {
        //getting token from FCM
        const fcm_token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
        });
        if (fcm_token) {
          //setting FCM token in indexed db using localforage
          localStorage.setItem('fcm_token', fcm_token);
          //return the FCM token after saving it
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMessage: async function () {
    if (firebase.getApps().length > 0) {
      try {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
          console.log('Message Received', payload);
        });
      } catch (error) {}
    }
  },
};

export const app = firebase.getApps().length === 0 ? firebase.initializeApp(clientConfig) : firebase.getApps()[0];

export const firebaseAuth = getAuth(app);
