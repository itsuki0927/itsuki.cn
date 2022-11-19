'use client';

import { useEffect, useRef } from 'react';
import useLocalStorage from '../useLocalStorage';
import useMount from '../useMount';

export type ColorTheme = 'light' | 'dark';

const COLOR_THEME = 'theme' as const;

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<ColorTheme>(COLOR_THEME, 'light');
  const bodyClsRef = useRef<DOMTokenList>();

  useMount(() => {
    bodyClsRef.current = document.documentElement.classList;
  });

  useEffect(() => {
    if (theme === 'dark') {
      bodyClsRef.current?.add('dark');
      bodyClsRef.current?.remove('light');
    } else {
      bodyClsRef.current?.add('light');
      bodyClsRef.current?.remove('dark');
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return [theme, switchTheme] as const;
};

export default useTheme;
