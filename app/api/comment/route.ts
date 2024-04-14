import { sendBlogCommentEmail, sendGuestbookEmail } from '@/actions/email';
import { getLocationByIP, getIP } from '@/actions/ip';
import { createSupabaseServerClient } from '@/libs/supabase/server';
import { GUESTBOOK, commentState } from '@/constants/comment';
import { VERCEL_ENV } from '@/constants/env';
import { kvKeys } from '@/constants/kv';
import { TAGS } from '@/constants/tag';
import { redis } from '@/libs/upstash';
import { InsertComment, InsertCommentBody } from '@/types/comment';
import { Ratelimit } from '@upstash/ratelimit';
import { revalidateTag } from 'next/cache';
import {
  type NextRequest,
  NextResponse,
  userAgent as getUserAgent,
} from 'next/server';
import { formatUser } from '@/utils/formatUser';
import { Blog } from '@/types/blog';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '10 s'),
  analytics: true,
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const blogId = Number(searchParams.get('blogId'));
  const section = searchParams.get('section') ?? '';

  if (!blogId) {
    return new Response('参数错误', {
      status: 429,
    });
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('comment_dev')
    .select('*')
    .eq('blogId', Number(blogId))
    .eq('section', section);

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const row = (await req.json()) as InsertCommentBody;
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

  let blogData: Blog | null = null;

  // 如果是博客的评论
  if (blogId !== GUESTBOOK) {
    const blogRes = await supabase
      .from('blog')
      .select('*')
      .eq('id', blogId)
      .maybeSingle();

    if (!blogRes.data || blogRes.error) {
      return new NextResponse(
        blogRes.error?.message || `blogId:${blogId} not found`,
        {
          status: 400,
        },
      );
    }

    blogData = blogRes.data;
  }

  const formatedUser = formatUser(user.user)!;
  const userAgent = getUserAgent({ headers: req.headers });
  const geo = await getLocationByIP(ip);
  const input: InsertComment = {
    ...row,
    ...formatedUser,
    userAgent,
    geo,
    ip,
    // blog comment 相关字段，方便查询
    blogSlug: blogData?.slug,
    blogTitle: blogData?.title,
    isDev: VERCEL_ENV !== 'production',
  };
  console.log('geo:', geo, ip, formatedUser);
  console.log('input:', input);

  try {
    const { data, error } = await supabase
      .from('comment_dev')
      .insert(input)
      .select()
      .maybeSingle();

    console.log('data:', data, error);

    if (input.blogId === GUESTBOOK) {
      sendGuestbookEmail({ user: formatedUser, content: input.content });
    } else {
      sendBlogCommentEmail({
        user: formatedUser,
        content: input.content,
        blogSlug: blogData?.slug!,
        blogTitle: blogData?.title!,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[createComment] Error:', error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const body = (await req.json()) as { id: number; emoji: string };
  console.log('body:', body);
  const { id, emoji } = body;
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
