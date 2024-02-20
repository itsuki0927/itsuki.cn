'use server';

import { getSession, isAdminSession } from '@/actions/session';
import { CommentState, GUESTBOOK } from '@/constants/comment';
import { VERCEL_ENV } from '@/constants/env';
import { TAGS } from '@/constants/tag';
import { createBrowserClient } from '@/libs/supabase';
import { InsertComment } from '@/types/comment';
import { unstable_noStore as noStore, revalidateTag } from 'next/cache';
import { headers as getHeaders } from 'next/headers';
import { userAgent as getUserAgent } from 'next/server';
import { sendGuestbookEmail } from './email';
import { checkIPIsBlocked, getGeoByIP, getIP } from './ip';
import { unstable_cache as cache } from 'next/cache';

export const getComments = cache(
  async (blogId: Number) => {
    noStore();
    const supabase = createBrowserClient();
    try {
      const { data: comments } = await supabase
        .from('comment')
        .select('*')
        .eq('blogId', blogId)
        .eq('state', CommentState.Published)
        .order('createdAt', { ascending: false });
      return comments;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  },
  ['getComments'],
  { revalidate: 3600 },
);

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

    return comments;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const createComment = async (
  row: Pick<InsertComment, 'blogId' | 'content'>,
) => {
  const user = await getSession();
  if (!user) {
    return;
  }
  let ip = getIP();
  if (VERCEL_ENV === 'development') {
    ip = '221.194.171.227'; // mock
  }
  const isBlocked = await checkIPIsBlocked();
  if (isBlocked) {
    throw new Error('You have been blocked.');
  }
  const headers = getHeaders();
  const userAgent = getUserAgent({ headers });
  const geo = await getGeoByIP(ip);
  console.log('geo:', VERCEL_ENV, geo, ip);
  const input = { ...row, ...user, userAgent, geo, ip };
  const supabase = createBrowserClient();
  try {
    const { data } = await supabase.from('comment').insert([input]).select();

    if (input.blogId === GUESTBOOK) {
      sendGuestbookEmail({ user, content: input.content });
    }

    revalidateTag(TAGS.comment);
    return data;
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

export const likeComment = async (id: number, emoji: string) => {
  const isBlocked = await checkIPIsBlocked();
  if (isBlocked) {
    throw new Error('You have been blocked.');
  }
  const session = await getSession();
  if (!session) {
    return;
  }
  if (isNaN(id)) {
    throw new Error('参数错误');
  }

  const supabase = createBrowserClient();
  const { data } = await supabase.from('comment').select('*').eq('id', id);
  const comment = data?.at(0);
  if (!data || !comment) {
    throw new Error('评论不存在');
  }

  if (comment.state !== CommentState.Published) {
    throw new Error('评论还没发布呢');
  }

  const currentEmojiMap = comment.emoji || {};
  const email = session.email;

  // 如果有 emoji
  if (currentEmojiMap) {
    if (currentEmojiMap[emoji]) {
      if (currentEmojiMap[emoji].includes(email)) {
        currentEmojiMap[emoji] = currentEmojiMap[emoji].filter(
          (v) => v !== email,
        );
      } else {
        currentEmojiMap[emoji].push(email);
      }
    } else {
      currentEmojiMap[emoji] = [email];
    }
  }

  const result = await supabase
    .from('comment')
    .update({ emoji: currentEmojiMap })
    .eq('id', id);

  return result;
};
