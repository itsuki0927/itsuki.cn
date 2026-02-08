import { type NextRequest, NextResponse } from 'next/server';
import { checkIPIsBlocked } from './actions/ip';
import { ENV } from './constants/env';
// import { updateSession } from './libs/supabase/middleware';

export const config = {
  // matcher: ['/((?!_next|studio|.*\\..*).*)'],
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;

  const isApi = nextUrl.pathname.startsWith('/api/');
  const isBlocked = await checkIPIsBlocked(req);

  if (isBlocked) {
    if (isApi) {
      return NextResponse.json(
        { error: 'You have been blocked.' },
        { status: 403 }
      );
    }

    nextUrl.pathname = '/blocked';
    return NextResponse.rewrite(nextUrl);
  }

  if (nextUrl.pathname === '/blocked' && ENV.isProd) {
    nextUrl.pathname = '/';
    return NextResponse.redirect(nextUrl);
  }

  // await updateSession(req);

  return NextResponse.next();
};

export default middleware;
