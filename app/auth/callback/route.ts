import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/libs/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    console.log('[error]:', data, error);
  }

  return NextResponse.redirect(requestUrl.origin);
}
