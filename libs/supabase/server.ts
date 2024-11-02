'use server';

import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from '@/constants/env';
import { Database } from '@/types/database';
import buildUrl from '@/utils/buildUrl';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          const value = cookieStore.get(name)?.value;
          console.log('createSupabaseServerClient get:', name, value);
          return value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
            console.log('createSupabaseServerClient set:', name, value);
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            console.log('createSupabaseServerClient remove:', name);
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {}
        },
      },
    },
  );
};

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  console.log('signOut:', error);

  if (error) {
    console.log('error:', error);
    // return getErrorRedirect(
    //   pathName,
    //   'Hmm... Something went wrong.',
    //   'You could not be signed out.'
    // );
  }

  return { path: '/guestbook' };
}

export const signInWithGithub = async () => {
  const redirectURL = buildUrl('/auth/callback');
  const supabaseBrowserClient = await createSupabaseServerClient();
  const { error } = await supabaseBrowserClient.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectURL.toString(),
    },
  });

  console.log('error:', error);
};

export const signInWithGoogle = async () => {
  const redirectURL = buildUrl('/auth/callback');
  const supabaseBrowserClient = await createSupabaseServerClient();
  const { error } = await supabaseBrowserClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectURL.toString(),
    },
  });

  console.log('error:', error);
};
