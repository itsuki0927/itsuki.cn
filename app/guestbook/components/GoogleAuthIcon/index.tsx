"use client";

import type { MouseEvent } from "react";
import { signIn } from "next-auth/react";

interface GoogleIconProps {
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const GoogleAuthIcon = ({ className = "", onClick }: GoogleIconProps) => {
  const handleSignIn = (e: MouseEvent) => {
    signIn();
    onClick?.(e);
  };

  return (
    <button className={className} onClick={handleSignIn} type="button">
      <span className="inline-flex items-center rounded-lg border border-solid border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-100">
        {/* <GoogleOutlined className="mr-1" /> */}
        <span className="capsize">Google</span>
      </span>
    </button>
  );
};

export default GoogleAuthIcon;
