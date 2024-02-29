'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section className="pointer-events-none inset-0 flex py-24 px-8 w-full flex-col items-center justify-center">
      <motion.div
        className="text-9xl font-extrabold ..."
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <span className="text-gradient-primary pointer-events-none select-none">
          404
        </span>
      </motion.div>
      <Link
        href="/"
        className="mt-6 pointer-events-auto select-none text-xl font-bold text-white mix-blend-difference hover:underline"
      >
        返回主页
      </Link>
    </section>
  );
};

export default NotFoundPage;
