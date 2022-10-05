import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { Member } from './auth';
import { db } from './firebase';

const USER_DB_NAME = 'users';

export async function createUser(uid: string, user: Omit<Member, 'token'>) {
  setDoc(doc(db, USER_DB_NAME, uid), user, { merge: true });
}

export async function getUsers() {
  const userCollection = collection(db, USER_DB_NAME);
  const userSnapshot = await getDocs(userCollection);
  return userSnapshot.docs.map(document => document.data());
}
