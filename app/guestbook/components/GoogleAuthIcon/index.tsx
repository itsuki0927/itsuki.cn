'use client';

import type { MouseEvent } from 'react';
import { signIn } from 'next-auth/react';
import { Chrome } from 'lucide-react';

interface GoogleIconProps {
  onClick?: (e: MouseEvent) => void;
}

const GoogleAuthIcon = ({ onClick }: GoogleIconProps) => {
  const handleSignIn = (e: MouseEvent) => {
    signIn();
    onClick?.(e);
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
