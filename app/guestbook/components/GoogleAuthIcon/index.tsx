'use client';

import type { MouseEvent } from 'react';
import { Chrome } from 'lucide-react';
import { supabaseBrowserClient } from '@/libs/supabase/client';
import clsx from 'clsx';

interface GoogleIconProps {
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

const GoogleAuthIcon = ({ onClick, className }: GoogleIconProps) => {
  const handleSignIn = (e: MouseEvent) => {
    onClick?.(e);
    supabaseBrowserClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      className={clsx(
        'inline-flex items-center rounded-lg border border-solid border-gray-200 bg-white py-2 px-4 text-sm text-gray-900 transition-colors hover:bg-gray-100',
        className,
      )}
      onClick={handleSignIn}
      type="button"
    >
      <Chrome size={14} className="mr-2" />
      <span className="text-xs">使用 Google 登陆</span>
    </button>
  );
};

export default GoogleAuthIcon;
