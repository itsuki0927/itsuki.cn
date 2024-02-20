import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  size?: number;
}

const Logo = ({ size = 40 }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        alt="logo"
        className="h-10 w-10"
        height={size}
        src="/logo.png"
        width={size}
      />
    </Link>
  );
};

export default Logo;
