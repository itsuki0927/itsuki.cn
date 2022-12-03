'use client';

import { useReducedMotion, motion } from 'framer-motion';
import classNames from 'classnames';
import { useMemo } from 'react';
import { BlogDetailResponse } from '@/entities/blog';
import useProgress from '@/hooks/useProgress';
import useScrollSpy from '@/hooks/useScrollSpy';
import useScrollTo from '@/hooks/useScrollTo';
import { getBlogHeadingElementId } from '@/constants/anchor';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';
import ProgressBar from './ProgressBar';
import { canUseDOM } from '@/utils/query';

interface BlogAsideProps {
  blog: BlogDetailResponse;
  className?: string;
}

const OFFSET = 150;

const TableOfContent = ({ blog, className = '' }: BlogAsideProps) => {
  const h2Headings = blog.headings;

  const shouldReduceMotion = useReducedMotion();
  const readingProgress = useProgress();
  const h2HeadingsDom = useMemo(() => {
    return canUseDOM
      ? (h2Headings ?? []).map(
          item => document.getElementById(getBlogHeadingElementId(item.id))!
        )
      : [];
  }, [h2Headings]);
  const [currentActiveIndex] = useScrollSpy(h2HeadingsDom, { offset: OFFSET });

  const { scrollTo } = useScrollTo();

  const shouldDisplayTableOfContent = readingProgress > 0.07 && readingProgress < 0.95;

  const variants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (shouldDisplayTableOfContentParam: boolean) => ({
      opacity: shouldReduceMotion || shouldDisplayTableOfContentParam ? 1 : 0,
    }),
  };

  const handleScrollTo = (id: string) => {
    gtag.event('blog_aside', {
      category: GAEventCategories.Blog,
    });
    scrollTo(id, -64 - 24);
  };

  return (
    <div
      className={classNames(
        'top-1/2 left-4 hidden -translate-y-1/2 p-6 text-gray-400 sm:fixed sm:flex',
        className
      )}
    >
      <ProgressBar progress={readingProgress} />
      {/* TODO: 设置显示范围 */}
      <ul className='ml-5 hidden space-y-2 sm:block'>
        {h2Headings?.map((heading, index) => (
          <motion.li
            onClick={() => handleScrollTo(heading.id)}
            key={heading.id}
            initial='hide'
            variants={variants}
            animate='show'
            transition={{ type: 'spring' }}
            custom={shouldDisplayTableOfContent}
            className={classNames(
              'block cursor-pointer transition-colors line-clamp-1 hover:text-primary',
              currentActiveIndex === index ? 'text-primary' : ''
            )}
          >
            <span className='text-sm'>{heading.text}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContent;
