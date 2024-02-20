'use server';

import { supabase } from '@/libs/supabase';

export const getAllCategories = async () => {
  const { data } = await supabase.from('category').select('*');
  return data || [];
};

export const getCategoryBySlug = async (slug: string) => {
  const data = await getAllCategories();
  return data.find((category) => category.slug === slug);
};
