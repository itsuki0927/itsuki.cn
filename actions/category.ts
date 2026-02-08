import { supabaseBrowserClient } from '../libs/supabase/client';
import { unstable_cache as cache } from 'next/cache';
import {
  BLOG_DATA_REVALIDATE_SECONDS,
  CATEGORY_CACHE_TAG,
} from '../constants/cache';

export const getAllCategories = async () => {
  return getAllCategoriesCached();
};

const getAllCategoriesCached = cache(
  async () => {
    const { data } = await supabaseBrowserClient
      .from('category')
      .select('*')
      .order('sort', { ascending: false });

    return data || [];
  },
  ['getAllCategories'],
  {
    tags: [CATEGORY_CACHE_TAG],
    revalidate: BLOG_DATA_REVALIDATE_SECONDS,
  }
);

export const getCategoryBySlug = async (slug: string) => {
  const data = await getAllCategories();
  return data.find((category) => category.slug === slug);
};
