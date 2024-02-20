'use client';

import useScrollTo from '@/hooks/useScrollTo';
import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';
import { useMemo } from 'react';
import ProgressBar from './ProgessBar';
import useProgress from './useProgress';
import useScrollSpy from './useScrollSpy';
import canUseDOM from '@/utils/canUseDOM';
import { BlogHeading } from '@/utils/getHeadings';

interface BlogTableOfContentProps {
  headings: BlogHeading[];
}

const OFFSET = 150;

const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delay: 0.255,
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
} satisfies Variants;

const BlogTableOfContentUI = ({ headings }: BlogTableOfContentProps) => {
  const h2Headings = headings;
  const h2HeadingsDom = useMemo(() => {
    return canUseDOM
      ? h2Headings.map(
          (item) => document.querySelector(`[data-id="${item.id}"]`)!,
        )
      : [];
  }, [h2Headings]);
  const [currentActiveIndex] = useScrollSpy(h2HeadingsDom, { offset: OFFSET });
  const scrollTo = useScrollTo();
  const readingProgress = useProgress();

  const handleScrollTo = (id: string) => {
    const scrollToElement = document.querySelector(`[data-id="${id}"]`);
    if (scrollToElement) {
      scrollTo(scrollToElement);
    }
  };

  return (
    <div className="top-1/2 left-4 max-h-[500px] hidden -translate-y-1/2 p-6 text-zinc-400 sm:fixed sm:flex">
      <ProgressBar progress={readingProgress} />
      <motion.ul
        className="ml-3 hidden space-y-1 sm:block group"
        initial="hidden"
        animate="visible"
        variants={listVariants}
      >
        {h2Headings.map((heading, index) => (
          <motion.li
            animate="show"
            id={heading.id}
            className={clsx(
              'line-clamp-1 block cursor-pointer transition-colors hover:text-primary',
              // heading.id === 1 ? 'ml-2' : '',
              currentActiveIndex === index
                ? 'text-primary/60 dark:text-zinc-200'
                : 'hover:text-primary/60 dark:hover:text-zinc-400 group-hover:[&:not(:hover)]:text-zinc-400 dark:group-hover:[&:not(:hover)]:text-zinc-600',
            )}
            key={heading.id}
            onClick={() => {
              handleScrollTo(heading.id);
            }}
            transition={{ type: 'spring' }}
          >
            <span className="text-xs">{heading.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default BlogTableOfContentUI;
