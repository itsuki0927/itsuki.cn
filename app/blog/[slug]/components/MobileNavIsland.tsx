'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Blog } from '@/types/blog';
import getHeadings from '@/utils/getHeadings';
import Link from 'next/link';
import { ListOrdered } from 'lucide-react';
import useScrollTo from '@/hooks/useScrollTo';
import { useOnClickOutside } from 'usehooks-ts';

interface MobileNavIslandProps {
  blog: Blog;
}

const MobileNavIsland = ({ blog }: MobileNavIslandProps) => {
  const headings = getHeadings(blog.content);
  const [headingListOpen, setHeadingListOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('Introduction');
  const scrollTo = useScrollTo();
  const containerRef = useRef(null);

  const close = () => setHeadingListOpen(false);
  useOnClickOutside(containerRef, close);

  return (
    <div className="relative" ref={containerRef}>
      {headingListOpen && (
        <motion.ul
          className="absolute bottom-full left-1/2 w-[calc(100%-16px)] max-w-[500px] p-4 rounded-lg shadow-md bg-zinc-50 border border-solid border-zinc-200"
          animate={{ y: 2, opacity: 1 }}
          initial={{ y: 10, opacity: 0 }}
          style={{ x: '-50%' }}
        >
          <li className="p-1">
            <button
              onClick={() => {
                setHeadingListOpen(false);
                setActiveHeading('Introduction');

                // Remove hash from URL and scroll to top
                history.pushState(
                  '',
                  document.title,
                  window.location.pathname + window.location.search,
                );
                window.scrollTo(0, 0);
              }}
            >
              Introduction
            </button>
          </li>
          {headings.map((heading) => (
            <li key={heading.id} className="p-1">
              <a
                href={`#${heading.id}`}
                onClick={() => {
                  scrollTo(`#${heading.id}`);
                  close();
                  setActiveHeading(heading.text);
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </motion.ul>
      )}

      <nav className="relative p-2 items-center bg-zinc-50 border-solid border border-zinc-200 shadow-md rounded-xl text-zinc-950 overflow-hidden flex justify-between w-full">
        <Link href="/" className="underline">
          五块木头
        </Link>
        <motion.div animate={{ y: 0 }}>
          <button
            className="flex gap-2 items-center h-8 px-2 rounded hover:bg-zinc-200 mx-auto"
            onClick={() => setHeadingListOpen(!headingListOpen)}
          >
            <ListOrdered />
            <span>{activeHeading}</span>
          </button>
        </motion.div>
      </nav>
    </div>
  );
};

export default MobileNavIsland;
