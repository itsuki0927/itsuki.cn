import { supabaseBrowserClient } from '@/libs/supabase/client';

export const getAllCategories = async () => {
  const { data } = await supabaseBrowserClient.from('category').select('*');
  return data || [];
};

export const getCategoryBySlug = async (slug: string) => {
  const data = await getAllCategories();
  return data.find((category) => category.slug === slug);
};
