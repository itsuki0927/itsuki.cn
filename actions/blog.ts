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
