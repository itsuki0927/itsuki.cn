"use client";

import type { MouseEvent } from "react";
import { signIn } from "next-auth/react";

interface GithubIconProps {
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const GithubAuthIcon = ({ className = "", onClick }: GithubIconProps) => {
  const handleSignIn = (e: MouseEvent) => {
    signIn();
    onClick?.(e);
  };

  return (
    <button className={className} onClick={handleSignIn} type="button">
      <span className="inline-flex items-center rounded-lg border border-solid border-github bg-github px-4 py-2 text-sm text-white opacity-90 transition-opacity hover:opacity-100">
        {/* < className="mr-1" /> */}
        <span className="capsize">Github</span>
      </span>
    </button>
  );
};

export default GithubAuthIcon;
