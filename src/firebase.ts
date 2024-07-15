import { getApps, initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { getAuth } from 'firebase/auth';

export const app = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0];

export const firebaseAuth = getAuth(app);
