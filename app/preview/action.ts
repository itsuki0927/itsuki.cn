'use server';

import { createSupabaseServerClient } from '@/libs/supabase/server';
import { Blog } from '@/types/blog';

export const getDraftBlogs = async () => {
  const supabase = createSupabaseServerClient();
  const { data: blogs } = await supabase
    .from('blog')
    .select('*, tag (*), blogTag (*), category (*)')
    .eq('state', 'draft');
  return blogs as Blog[];
};

export const getDraftBlog = async (slug: string) => {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from('blog')
    .select('*, tag (*), blogTag (*), category (*)')
    .eq('slug', slug)
    .maybeSingle();
  console.log('data:', data);
  return data;
};
