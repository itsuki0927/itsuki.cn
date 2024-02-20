import { StandardProps } from "@/types/common";
import clsx from "clsx";
import React, { ReactNode } from "react";

interface HomeCardProps extends StandardProps {
  title: ReactNode;
}

const HomeCard = ({ title, className, children }: HomeCardProps) => {
  return (
    <div className="rounded-xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>

      <div className={clsx("mt-6", className)}>{children}</div>
    </div>
  );
};

export default HomeCard;
