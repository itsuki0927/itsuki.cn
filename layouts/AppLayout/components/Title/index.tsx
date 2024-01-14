import type { ReactNode } from "react";

interface TitleProps {
  title: ReactNode;
  subTitle?: ReactNode;
}

const Title = ({ title, subTitle }: TitleProps) => {
  return (
    <div className="max-w-2xl mb-10 md:mb-14">
      <h3 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        {title}
      </h3>
      {subTitle ? (
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <span>{subTitle}</span>
        </p>
      ) : null}
    </div>
  );
};

export default Title;
