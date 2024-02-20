'use client';

import { ADMIN_EMAIL1 } from '@/constants/env';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex py-24 w-full flex-col items-center justify-center text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <h1 className="mb-4 text-4xl font-black tracking-tighter">
        哎呀，不知道为啥出错啦！！！
      </h1>
      <span className="text-sm">
        或许你可以刷新一下页面，如果还有问题的话可以联系作者：
        <a href={`mailto:${ADMIN_EMAIL1}`} className="font-bold underline">
          {ADMIN_EMAIL1}
        </a>
      </span>
    </main>
  );
};

export default Error;
