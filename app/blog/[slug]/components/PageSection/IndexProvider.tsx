'use client';

import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';

const IndexContext = createContext<{
  index: number;
  numSections: number;
  next: () => void;
  prev: () => void;
  set: (index: number) => void;
  registerSection: (index: number, element: HTMLElement | null) => void;
}>({
  index: 0,
  numSections: 0,
  next: () => {},
  prev: () => {},
  set: () => {},
  registerSection: () => {},
});

interface IndexProviderProps {
  numSections?: number;
  children: ReactNode;
}

export function IndexProvider({
  children,
  numSections = Number.POSITIVE_INFINITY,
}: IndexProviderProps) {
  const [index, setIndex] = useState(0);
  const sectionElementsRef = useRef(new Map<number, HTMLElement>());

  const syncIndexFromViewport = useCallback(() => {
    const viewportMiddle = window.innerHeight / 2;
    const sortedIndexes = Array.from(sectionElementsRef.current.keys()).sort(
      (a, b) => a - b,
    );

    let nextIndex = 0;
    for (const sectionIndex of sortedIndexes) {
      const element = sectionElementsRef.current.get(sectionIndex);
      if (!element) {
        continue;
      }
      if (element.getBoundingClientRect().top < viewportMiddle) {
        nextIndex = sectionIndex;
      }
    }

    setIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  }, []);

  const registerSection = useCallback(
    (sectionIndex: number, element: HTMLElement | null) => {
      if (element) {
        sectionElementsRef.current.set(sectionIndex, element);
      } else {
        sectionElementsRef.current.delete(sectionIndex);
      }

      if (typeof window !== 'undefined') {
        syncIndexFromViewport();
      }
    },
    [syncIndexFromViewport],
  );

  useEffect(() => {
    const handleScroll = () => {
      syncIndexFromViewport();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [syncIndexFromViewport]);

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, numSections - 1)),
    [numSections],
  );
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  return (
    <IndexContext.Provider
      value={{
        index,
        numSections,
        next,
        prev,
        set: setIndex,
        registerSection,
      }}
    >
      {children}
    </IndexContext.Provider>
  );
}

export const useIndexContext = () => useContext(IndexContext);
