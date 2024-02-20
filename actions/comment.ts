import { VERCEL_ENV } from '@/constants/env';
import { supabaseBrowserClient } from '@/libs/supabase/client';

interface SearchCommentParams {
  blogId?: number;
}

export const getAllComments = async (params: SearchCommentParams = {}) => {
  try {
    const builder = supabaseBrowserClient
      .from('comment_dev')
      .select('*')
      .order('createdAt', { ascending: false });

    if (params.blogId) {
      builder.eq('blogId', params.blogId);
    }
    if (VERCEL_ENV === 'production') {
      builder.eq('isDev', false);
    }

    const { data: comments } = await builder;

    return comments || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
