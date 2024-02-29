import { supabaseBrowserClient } from '@/libs/supabase/client';

export const getAllTags = async () => {
  const { data } = await supabaseBrowserClient
    .from('tag')
    .select('*')
    .order('id', { ascending: true });
  return data || [];
};

export const getTagBySlug = async (slug: string) => {
  const data = await getAllTags();
  return data.find((tag) => tag.slug === slug);
};
