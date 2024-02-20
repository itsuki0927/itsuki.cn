'use client';

import { useEffect, useRef, useState } from 'react';

export type UseScrollSpyOptions = {
  offset?: number;
  root?: Element;
};

const useScrollSpy = (
  elements: Element[],
  options?: UseScrollSpyOptions,
): [number, Element[]] => {
  const [currentActiveSectionIdx, setCurrentActiveSectionIdx] = useState(-1);

  const rootMargin = `-${options?.offset ?? 0}px 0px 0px 0px`;

  const scrolledSections =
    currentActiveSectionIdx > 0
      ? elements.slice(0, currentActiveSectionIdx + 1)
      : [];

  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const indexOfSectionToHighlight = entries.findIndex(
          (entry) => entry.intersectionRatio > 0,
        );

        setCurrentActiveSectionIdx(indexOfSectionToHighlight);
      },
      {
        root: (options && options.root) || null,
        rootMargin,
      },
    );

    const { current: currentObserver } = observerRef;

    elements.forEach((element) =>
      element ? currentObserver.observe(element) : null,
    );

    return () => currentObserver.disconnect();
  }, [elements, options, rootMargin]);

  return [currentActiveSectionIdx, scrolledSections];
};

export default useScrollSpy;
