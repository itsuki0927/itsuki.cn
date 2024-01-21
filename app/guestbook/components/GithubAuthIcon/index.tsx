'use client';

import type { MouseEvent } from 'react';
import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';

interface GithubIconProps {
  onClick?: (e: MouseEvent) => void;
}

const GithubAuthIcon = ({ onClick }: GithubIconProps) => {
  const handleSignIn = (e: MouseEvent) => {
    signIn();
    onClick?.(e);
  };

  return (
    <button
      className="inline-flex items-center  rounded-lg border border-solid border-github bg-github py-2 px-4 text-sm text-white bg-zinc-800 opacity-90 transition-opacity hover:opacity-100"
      onClick={handleSignIn}
      type="button"
    >
      <Github size={14} className="mr-1" />
      <span>Github</span>
    </button>
  );
};

export default GithubAuthIcon;
