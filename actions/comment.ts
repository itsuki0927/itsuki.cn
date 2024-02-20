'use server';

import { isAdminSession } from '@/actions/session';
import { CommentState } from '@/constants/comment';
import { TAGS } from '@/constants/tag';
import { createBrowserClient } from '@/libs/supabase';
import { revalidateTag } from 'next/cache';

interface SearchCommentParams {
  state?: CommentState;
  blogId?: number;
}

export const getAllComments = async (params: SearchCommentParams = {}) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  // noStore();
  const supabase = createBrowserClient();
  try {
    const builder = supabase
      .from('comment')
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
    return comments;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const updateCommentsState = async (
  ids: number[],
  state: CommentState,
) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  if (ids.some((id) => isNaN(id))) {
    throw new Error('参数错误');
  }

  const supabase = createBrowserClient();
  try {
    const { data } = await supabase
      .from('comment')
      .update({ state })
      .in('id', ids);

    revalidateTag(TAGS.adminComment);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const updateCommentState = (id: number, state: CommentState) =>
  updateCommentsState([id], state);

export const deleteComments = async (ids: number[]) => {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return;
  }
  if (ids.some((id) => isNaN(id))) {
    throw new Error('参数错误');
  }

  const supabase = createBrowserClient();
  try {
    const { data } = await supabase.from('comment').delete().in('id', ids);

    revalidateTag(TAGS.adminComment);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const deleteComment = (id: number) => deleteComments([id]);
