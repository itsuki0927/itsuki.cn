'use server';

import { User } from 'next-auth';
import { auth } from '@/libs/auth';
import isAdminEmail from '@/utils/isAdminEmail';

const formatUser = (user: User | null) => {
  if (!user) return null;
  return {
    email: user.email ?? '',
    nickname: user.name || user.email || '',
    avatar: user.image || '',
  };
};

export const getSession = async () => {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return formatUser(session.user);
};

export const isAdminSession = async () => {
  try {
    const session = await getSession();
    return isAdminEmail(session?.email);
  } catch (err) {
    return false;
  }
};
