'use server';

import { COMMENT_TABLE, CommentState } from '@/constants/comment';
import { supabase } from '@/libs/supabase';

interface SearchCommentParams {
  state?: CommentState;
  blogId?: number;
}

export const getAllComments = async (params: SearchCommentParams = {}) => {
  try {
    const builder = supabase
      .from(COMMENT_TABLE)
      .select('*')
      .order('createdAt', { ascending: false });
    if (params.state) {
      builder.eq('state', params.state);
    }
    if (params.blogId) {
      builder.eq('blogId', params.blogId);
    }

    const { data: comments } = await builder;

    console.log('comments:', comments);
    return comments || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
