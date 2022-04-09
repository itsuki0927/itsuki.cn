import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { DarkModeSwitch as DarkModeSwitchFacker } from 'react-toggle-dark-mode';
import { useLocalStorage } from '@/hooks/index';

const DarkModeSwitch = dynamic(
  () =>
    import('react-toggle-dark-mode').then(mod => mod.DarkModeSwitch) as Promise<
      typeof DarkModeSwitchFacker
    >,
  { loading: () => <div className='h-5 w-5' /> }
);

type ColorTheme = 'light' | 'dark';

const ThemeSwitch: React.FC = () => {
  const COLOR_THEME = 'theme' as const;
  const [theme, setTheme] = useLocalStorage<ColorTheme>(COLOR_THEME, 'light');

  useEffect(() => {
    const bodyClass = document.documentElement.classList;
    if (theme === 'dark') {
      bodyClass.add('light');
      bodyClass.remove('dark');
    } else {
      bodyClass.add('dark');
      bodyClass.remove('light');
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <Head>
        <meta name='theme-color' content={theme === 'dark' ? '#000' : '#fdfdfd'} />
      </Head>
      <div className='flex h-5 w-5 items-center bg-transparent'>
        <DarkModeSwitch
          checked={theme === 'light'}
          onChange={switchTheme}
          moonColor='rgb(168 160 149)'
          sunColor='#2d2d2d'
        />
      </div>
    </>
  );
};

export default ThemeSwitch;
