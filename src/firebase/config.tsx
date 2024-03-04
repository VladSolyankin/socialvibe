import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDY4Bt-0RpEOe5t7osFsDO_vm3whbAHeBU',
  authDomain: 'socialvibe-92a74.firebaseapp.com',
  projectId: 'socialvibe-92a74',
  storageBucket: 'socialvibe-92a74.appspot.com',
  messagingSenderId: '880598482311',
  appId: '1:880598482311:web:58fe6a15184d29260da722',
  measurementId: 'G-6YJPV73L91',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
