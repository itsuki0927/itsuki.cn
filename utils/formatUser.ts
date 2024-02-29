import { User } from '@supabase/supabase-js';

export const formatUser = (user: User | null) => {
  if (!user) return null;
  return {
    email: user?.user_metadata.email ?? '',
    nickname: user.user_metadata.name || '',
    avatar: user.user_metadata.avatar_url || '',
  };
};

export type FormatUser = ReturnType<typeof formatUser>;
