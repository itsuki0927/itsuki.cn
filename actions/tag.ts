import { supabaseBrowserClient } from '../libs/supabase/client';
import { unstable_cache as cache } from 'next/cache';
import { BLOG_DATA_REVALIDATE_SECONDS, TAG_CACHE_TAG } from '../constants/cache';

export const getAllTags = async () => {
  return getAllTagsCached();
};

const getAllTagsCached = cache(
  async () => {
    const { data } = await supabaseBrowserClient
      .from('tag')
      .select('*')
      .order('id', { ascending: true });

    return data || [];
  },
  ['getAllTags'],
  {
    tags: [TAG_CACHE_TAG],
    revalidate: BLOG_DATA_REVALIDATE_SECONDS,
  }
);

export const getTagBySlug = async (slug: string) => {
  const data = await getAllTags();
  return data.find((tag) => tag.slug === slug);
};
