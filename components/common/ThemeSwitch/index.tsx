import dynamic from 'next/dynamic';
import Head from 'next/head';
import { DarkModeSwitch as DarkModeSwitchFacker } from 'react-toggle-dark-mode';
import { ColorTheme } from '@/hooks/useTheme';

const DarkModeSwitch = dynamic(
  () =>
    import('react-toggle-dark-mode').then(mod => mod.DarkModeSwitch) as Promise<
      typeof DarkModeSwitchFacker
    >,
  { loading: () => <div className='h-5 w-5' /> }
);

export interface ThemeSwitchProps {
  theme: ColorTheme;
  onChange: (checked: boolean) => void;
}

const ThemeSwitch = ({ theme, onChange }: ThemeSwitchProps) => (
  <>
    <Head>
      <meta name='theme-color' content={theme === 'dark' ? '#000' : '#fdfdfd'} />
    </Head>
    <div className='flex h-5 w-5 items-center bg-transparent'>
      <DarkModeSwitch
        checked={theme === 'dark'}
        onChange={onChange}
        moonColor='rgb(168 160 149)'
        sunColor='#2d2d2d'
      />
    </div>
  </>
);

export default ThemeSwitch;
