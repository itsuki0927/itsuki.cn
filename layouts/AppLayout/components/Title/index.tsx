import type { ReactNode } from 'react';

interface TitleProps {
  title: ReactNode;
  children?: ReactNode;
}

const Title = ({ title, children }: TitleProps) => {
  return (
    <div className="max-w-2xl mb-10 md:mb-14">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        {title}
      </h1>
      {children ? (
        <div className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Title;
