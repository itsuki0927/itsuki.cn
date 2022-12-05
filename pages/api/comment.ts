import admin from 'firebase-admin';
import { getAuth } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { createFirebaseApp } from '@/libs/firebase';

const serviceAccount = {};

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const firebaseApp = createFirebaseApp();
  const auth = getAuth(firebaseApp);
  app
    .auth()
    .verifyIdToken(req.headers.authorization ?? '')
    .then(value => {
      console.log('value:', value);
    });

  console.log('api comment', req.body, req.headers, auth.currentUser);
  if (req.method === 'post') {
    res.json({ data: 'message' });
  }
}
