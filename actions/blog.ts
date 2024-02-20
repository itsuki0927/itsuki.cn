'use server';

import { kvKeys } from '@/constants/kv';
import { redis } from '@/libs/upstash';
import { VERCEL_ENV } from '@/constants/env';
import { supabase } from '@/libs/supabase';
import { BlogSearchParams } from '@/types/blog';

export const getBlogViews = async (slug: string) => {
  let views: number;
  if (VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.blogViews(slug));
  } else {
    views = 30578;
  }
  return views;
};

export const getAllBlogs = async ({
  favorite,
  categorySlug,
  tagSlug,
}: BlogSearchParams = {}) => {
  const builder = supabase.from('blog').select('*');

  if (favorite) {
    builder.eq('favorite', favorite);
  }

  const { data } = await builder;
  console.log('data:', data);
  return data || [];
};

export const getBlog = async (slug: string) => {
  const { data } = await supabase.from('blog').select('*').eq('slug', slug);
  console.log('data:', data);
  return data?.at(0);
};
