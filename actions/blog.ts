import { supabaseBrowserClient } from '@/libs/supabase/client';
import { BlogSearchParams } from '@/types/blog';
import { getCategoryBySlug } from './category';

export const readBlog = async (id: number) => {
  supabaseBrowserClient.rpc('views_increment', {
    x: 1,
    rowid: id,
  });
};

export const getAllBlogs = async ({
  favorite,
  categorySlug,
  tagSlug,
}: BlogSearchParams = {}) => {
  const builder = supabaseBrowserClient
    .from('blog')
    .select('*, tag (*), blogTag (*), category (*)');

  if (favorite) {
    builder.eq('favorite', favorite);
  }

  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug);
    if (category) {
      builder.eq('categoryId', category.id);
    }
    // builder.eq('category.slug', categorySlug);
  }

  if (tagSlug) {
    builder.containedBy('tag.slug', [tagSlug]);
  }

  builder.order('id', { ascending: false });

  const { data } = await builder;

  return data || [];
};

export const getBlog = async (slug: string) => {
  const { data } = await supabaseBrowserClient
    .from('blog')
    .select('*, tag (*), blogTag (*), category (*)')
    .eq('slug', slug)
    .maybeSingle();
  return data;
};
