import { sendGuestbookEmail } from '@/actions/email';
import { getLocationByIP, getIP } from '@/actions/ip';
import { createSupabaseServerClient } from '@/libs/supabase/server';
import { GUESTBOOK, commentState } from '@/constants/comment';
import { VERCEL_ENV } from '@/constants/env';
import { kvKeys } from '@/constants/kv';
import { TAGS } from '@/constants/tag';
import { redis } from '@/libs/upstash';
import { InsertComment } from '@/types/comment';
import { Ratelimit } from '@upstash/ratelimit';
import { revalidateTag } from 'next/cache';
import {
  type NextRequest,
  NextResponse,
  userAgent as getUserAgent,
} from 'next/server';
import { formatUser } from '@/utils/formatUser';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '10 s'),
  analytics: true,
});

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();
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

  const formatedUser = formatUser(user.user);
  const userAgent = getUserAgent({ headers: req.headers });
  const geo = await getLocationByIP(ip);
  console.log('geo:', geo, ip, formatedUser);
  const input = {
    ...row,
    ...formatedUser,
    userAgent,
    geo,
    ip,
    isDev: VERCEL_ENV !== 'production',
  };

  try {
    const { data } = await supabase.from('comment_dev').insert(input).select();

    console.log('data:', data);

    if (input.blogId === GUESTBOOK) {
      sendGuestbookEmail({ user: formatedUser, content: input.content });
      // revalidatePath('/guestbook');
      revalidateTag('getComments');
    }

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
  const supabase = createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (isNaN(id)) {
    return NextResponse.json({ error: '参数错误' }, { status: 400 });
  }

  const { data } = await supabase.from('comment_dev').select('*').eq('id', id);
  const comment = data?.at(0);
  if (!data || !comment) {
    return NextResponse.json({ error: '评论不存在' }, { status: 400 });
  }

  if (
    comment.state !== commentState.published &&
    comment.state !== commentState.auditing
  ) {
    return NextResponse.json({ error: '评论还没发布呢' }, { status: 400 });
  }

  const currentEmojiMap = comment.emoji || {};
  const email = user.user?.email || '';

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
    .from('comment_dev')
    .update({ emoji: currentEmojiMap })
    .eq('id', id);

  revalidateTag(TAGS.comment);

  console.log('result:', result);

  return NextResponse.json(result);
}
