'use server';

import { User } from 'next-auth';
import { auth } from '@/libs/auth';

const formatUser = (user: User | null) => {
  if (!user) return null;
  return {
    email: user.email ?? '',
    nickname: user.name || user.email || '',
    avatar: user.image || '',
  };
};

export type FormatUser = ReturnType<typeof formatUser>;

export const getSession = async () => {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return formatUser(session.user);
};
