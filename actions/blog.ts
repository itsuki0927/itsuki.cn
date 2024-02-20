'use server';

import { kvKeys } from '@/constants/kv';
import { redis } from '@/libs/upstash';
import { VERCEL_ENV } from '@/constants/env';

export const getBlogViews = async (slug: string) => {
  let views: number;
  if (VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.blogViews(slug));
  } else {
    views = 30578;
  }
  return views;
};

const genMockReactions = () =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 50000));

export const getReactions = async (id: string): Promise<number[]> => {
  try {
    if (VERCEL_ENV === 'production') {
      const res = await fetch(`/api/reactions?id=${id}`, {
        next: {
          tags: [kvKeys.blogReactions(id)],
        },
      });
      const data = await res.json();
      return data;
    } else {
      return genMockReactions();
    }
  } catch (error) {
    console.error(error);
  }
  return genMockReactions();
};
