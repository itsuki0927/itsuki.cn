import { FirebaseOptions, initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FIREBASE } from '@/configs/app';

export const createFirebaseApp = () => {
  const apps = getApps();
  // 如果没有app进行init
  if (apps.length <= 0) {
    const firebaseConfig: FirebaseOptions = {
      apiKey: FIREBASE.API_KEY,
      authDomain: FIREBASE.AUTH_DOMAIN,
      projectId: FIREBASE.PROJECT_ID,
      storageBucket: FIREBASE.STORAGE_BUCKET,
      messagingSenderId: FIREBASE.MESSAGING_SENDER_ID,
      appId: FIREBASE.APP_ID,
      measurementId: FIREBASE.MEASUREMENT_ID,
    };
    return initializeApp(firebaseConfig);
  }
  // 返回默认的app
  return getApp();
};

export const firebaseApp = createFirebaseApp();
export const auth = getAuth(firebaseApp);

export const createFirestore = () => getFirestore(firebaseApp);
