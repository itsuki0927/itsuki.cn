import { sendGuestbookEmail } from '@/actions/email';
import { getGeoByIP, getIP } from '@/actions/ip';
import { getSession } from '@/actions/session';
import { CommentState, GUESTBOOK } from '@/constants/comment';
import { VERCEL_ENV } from '@/constants/env';
import { kvKeys } from '@/constants/kv';
import { TAGS } from '@/constants/tag';
import { createBrowserClient } from '@/libs/supabase';
import { redis } from '@/libs/upstash';
import { InsertComment } from '@/types/comment';
import { Ratelimit } from '@upstash/ratelimit';
import { revalidatePath, revalidateTag } from 'next/cache';
import {
  type NextRequest,
  NextResponse,
  userAgent as getUserAgent,
} from 'next/server';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '10 s'),
  analytics: true,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get('blogId');
  if (!blogId) {
    return new Response('Missing id', { status: 400 });
  }

  const supabase = createBrowserClient();
  try {
    const { data: comments } = await supabase
      .from('comment')
      .select('*')
      .eq('blogId', blogId)
      .in('state', [CommentState.Published, CommentState.Auditing])
      .order('createdAt', { ascending: false });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(error, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const row = (await req.json()) as Pick<InsertComment, 'blogId' | 'content'>;
  const ip = getIP(req);
  const blogId = row.blogId;

  const { success } = await ratelimit.limit(
    kvKeys.blogComments(String(blogId)) + `_${ip ?? ''}`,
  );
  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
    });
  }

  const userAgent = getUserAgent({ headers: req.headers });
  const geo = await getGeoByIP(ip);
  console.log('geo:', VERCEL_ENV, geo, ip);
  const input = { ...row, ...user, userAgent, geo, ip };
  const supabase = createBrowserClient();

  try {
    const { data } = await supabase.from('comment').insert([input]).select();

    if (input.blogId === GUESTBOOK) {
      sendGuestbookEmail({ user, content: input.content });
    }

    revalidatePath('/guestbook');

    return NextResponse.json(data);
  } catch (error) {
    console.error('[createComment] Error:', error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = (await req.json()) as { id: number; emoji: string };
  console.log('body:', body);
  const { id, emoji } = body;
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (isNaN(id)) {
    return NextResponse.json({ error: '参数错误' }, { status: 400 });
  }

  const supabase = createBrowserClient();
  const { data } = await supabase.from('comment').select('*').eq('id', id);
  const comment = data?.at(0);
  if (!data || !comment) {
    return NextResponse.json({ error: '评论不存在' }, { status: 400 });
  }

  if (
    comment.state !== CommentState.Published &&
    comment.state !== CommentState.Auditing
  ) {
    return NextResponse.json({ error: '评论还没发布呢' }, { status: 400 });
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

  revalidateTag(TAGS.comment);

  console.log('result:', result);

  return NextResponse.json(result);
}
