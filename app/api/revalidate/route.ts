import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { revalidateTag } from 'next/cache';
import { TAGS } from '@/constants/tag';

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const commentWebhooks = [
    'comments/create',
    'comments/delete',
    'comments/update',
  ];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  const isCommentUpdate = commentWebhooks.includes(topic);

  if (!isCommentUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCommentUpdate) {
    revalidateTag(TAGS.comment);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

export const runtime = 'edge';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
