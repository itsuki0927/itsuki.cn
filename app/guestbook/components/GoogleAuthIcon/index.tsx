'use client';

import type { MouseEvent } from 'react';
import { Chrome } from 'lucide-react';
import { supabaseBrowserClient } from '@/libs/supabase/client';

interface GoogleIconProps {
  onClick?: (e: MouseEvent) => void;
}

const GoogleAuthIcon = ({ onClick }: GoogleIconProps) => {
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
      className="inline-flex items-center rounded-lg border border-solid border-gray-200 bg-white py-2 px-4 text-sm text-gray-900 transition-colors hover:bg-gray-100"
      onClick={handleSignIn}
      type="button"
    >
      <Chrome size={14} className="mr-1" />
      <span>Google</span>
    </button>
  );
};

export default GoogleAuthIcon;
