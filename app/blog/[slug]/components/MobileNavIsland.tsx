'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BlogHeading } from '@/utils/getHeadings';
import Link from 'next/link';
import { ListOrdered } from 'lucide-react';
import useScrollTo from '@/hooks/useScrollTo';

interface MobileNavIslandProps {
  headings: BlogHeading[];
}

const MobileNavIsland = ({ headings }: MobileNavIslandProps) => {
  const [headingListOpen, setHeadingListOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('Introduction');
  const scrollTo = useScrollTo();
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setHeadingListOpen(false);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {headingListOpen && (
        <div
          className="absolute bottom-full left-1/2 w-[calc(100%-16px)] max-w-[500px] p-4 rounded-lg shadow-md bg-zinc-50 border border-solid border-zinc-200"
          style={{ transform: 'translateX(-50%)' }}
        >
          <ul>
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
          </ul>
        </div>
      )}

      <nav className="relative p-2 items-center bg-zinc-50 border-solid border border-zinc-200 shadow-md rounded-xl text-zinc-950 overflow-hidden flex justify-between w-full">
        <Link href="/" className="underline">
          五块木头
        </Link>
        <div>
          <button
            className="flex gap-2 items-center h-8 px-2 rounded hover:bg-zinc-200 mx-auto"
            onClick={() => setHeadingListOpen(!headingListOpen)}
          >
            <ListOrdered />
            <span>{activeHeading}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavIsland;
