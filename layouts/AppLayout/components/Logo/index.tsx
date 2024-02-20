import MyImage from "@/components/common/MyImage";
import Link from "next/link";
import React from "react";

interface LogoProps {
  size?: number;
}

const Logo = ({ size = 40 }: LogoProps) => {
  return (
    <Link href="/">
      <MyImage
        alt="五块木头的logo"
        className="h-10 w-10"
        height={size}
        src="/logo.png"
        width={size}
      />
    </Link>
  );
};

export default Logo;
