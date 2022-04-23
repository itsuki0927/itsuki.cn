import dynamic from 'next/dynamic';
import Head from 'next/head';
import { DarkModeSwitch as DarkModeSwitchFacker } from 'react-toggle-dark-mode';
import { useTheme } from '@/hooks';

const DarkModeSwitch = dynamic(
  () =>
    import('react-toggle-dark-mode').then(mod => mod.DarkModeSwitch) as Promise<
      typeof DarkModeSwitchFacker
    >,
  { loading: () => <div className='h-5 w-5' /> }
);

const ThemeSwitch: React.FC = () => {
  const [theme, switchTheme] = useTheme();
  return (
    <>
      <Head>
        <meta name='theme-color' content={theme === 'dark' ? '#000' : '#fdfdfd'} />
      </Head>
      <div className='flex h-5 w-5 items-center bg-transparent'>
        <DarkModeSwitch
          checked={theme === 'dark'}
          onChange={switchTheme}
          moonColor='rgb(168 160 149)'
          sunColor='#2d2d2d'
        />
      </div>
    </>
  );
};

export default ThemeSwitch;
