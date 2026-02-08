'use client';

import classNames from 'clsx';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useIndexContext } from './IndexProvider';

interface PageSectionProps {
  index: number;
  children: ReactNode;
}

function PageSection({ index, children }: PageSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSection } = useIndexContext();

  useEffect(() => {
    registerSection(index, ref.current);

    return () => {
      registerSection(index, null);
    };
  }, [index, registerSection]);

  return (
    <section
      id={`pageSection${index}`}
      ref={ref}
      className={classNames(
        'group relative pb-8 max-w-[100vw]',
        'gap-y-6 sm:space-y-[1.5em]',
        'sm:block',
      )}
    >
      <hr className="border-border border-dashed mb-10 lg:mb-16 group-first-of-type:hidden" />

      {children}

    </section>
  );
}

export default PageSection;
