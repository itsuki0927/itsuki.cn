import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = {};

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const auth = admin.auth();
