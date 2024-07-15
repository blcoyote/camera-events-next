// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDyAoCl_RFWGwPXw2WjVltlOOZZKJ7rD2g',
  authDomain: 'camera-events-f329e.firebaseapp.com',
  projectId: 'camera-events-f329e',
  storageBucket: 'camera-events-f329e.appspot.com',
  messagingSenderId: '248133674895',
  appId: '1:248133674895:web:f1d60a8b2f2620dde98dfa',
  measurementId: 'G-SWK2GK3E7F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
