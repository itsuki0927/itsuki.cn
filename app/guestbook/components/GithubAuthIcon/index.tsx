'use client';

import type { MouseEvent } from 'react';
import { Github } from 'lucide-react';
import { supabaseBrowserClient } from '@/libs/supabase/client';
import clsx from 'clsx';

interface GithubIconProps {
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

const GithubAuthIcon = ({ onClick, className }: GithubIconProps) => {
  const handleSignIn = (e: MouseEvent) => {
    onClick?.(e);
    supabaseBrowserClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      className={clsx(
        'inline-flex items-center rounded-lg border border-solid border-github bg-github py-2 px-4 text-sm text-white bg-zinc-800 opacity-90 transition-opacity hover:opacity-100',
        className,
      )}
      onClick={handleSignIn}
      type="button"
    >
      <Github size={14} className="mr-2" />
      <span className="text-xs">使用 Github 登陆</span>
    </button>
  );
};

export default GithubAuthIcon;
