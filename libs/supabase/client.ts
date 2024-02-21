import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from '@/constants/env';
import { Database } from '@/types/database';
import { createBrowserClient as _createBrowserClient } from '@supabase/ssr';

const createBrowserClient = () =>
  _createBrowserClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // {
    //   auth: {
    //     persistSession: false,
    //   },
    // },
  );

export const supabaseBrowserClient = createBrowserClient();
