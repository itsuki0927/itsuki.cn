import { ToggleLeft, ToggleRight } from 'react-feather';
import toast from 'react-hot-toast';
import Head from 'next/head';
import useTheme from '@/hooks/useTheme';

const ThemeSwitch = () => {
  const [theme] = useTheme();
  return (
    <>
      <Head>
        <meta name='theme-color' content={theme === 'dark' ? '#000' : '#fdfdfd'} />
      </Head>

      <button
        aria-label='Toggle Dark Mode'
        type='button'
        className='flex h-6 w-6 items-center justify-center rounded-lg transition-all'
        onClick={() => {
          toast.loading('暗黑模式秃头开发中...');
        }}
      >
        {theme === 'light' ? <ToggleLeft /> : <ToggleRight />}
      </button>
    </>
  );
};

export default ThemeSwitch;
