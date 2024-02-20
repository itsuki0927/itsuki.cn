import { supabaseBrowserClient } from '@/libs/supabase/client';

export const getAllTags = async () => {
  const { data } = await supabaseBrowserClient.from('tag').select('*');
  return data || [];
};

export const getTagBySlug = async (slug: string) => {
  const data = await getAllTags();
  return data.find((category) => category.slug === slug);
};
