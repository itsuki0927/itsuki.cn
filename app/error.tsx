'use client';

import { ADMIN_EMAIL1 } from '@/constants/env';
import { motion } from 'framer-motion';
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
    <section className="pointer-events-none inset-0 flex py-24 px-8 w-full flex-col items-center justify-center">
      <motion.div
        className="text-4xl font-extrabold"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <span className="text-gradient-primary pointer-events-none select-none">
          哎呀，不知道为啥出错啦！！！
        </span>
      </motion.div>
      <span className="mt-6 pointer-events-auto select-none text-sm font-bold text-white mix-blend-difference hover:underline">
        或许你可以刷新一下页面，如果还有问题的话可以联系作者：
        <a href={`mailto:${ADMIN_EMAIL1}`} className="font-bold underline">
          {ADMIN_EMAIL1}
        </a>
      </span>
    </section>
  );
};

export default Error;
