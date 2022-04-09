import classNames from 'classnames';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useState } from 'react';

const PageLoadingProgress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStart = (url: string) => {
    // eslint-disable-next-line no-console
    console.log(`[Loading: ${url}]`);
    setIsLoading(true);
    NProgress.start();
  };

  const handleStop = () => {
    // eslint-disable-next-line no-console
    console.log('[Loaded]');
    setIsLoading(false);
    NProgress.done();
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router.events]);

  return (
    <div
      className={classNames(
        'pointer-events-none fixed left-0 top-0 z-50 h-full w-full opacity-0 backdrop-blur-sm transition-opacity',
        {
          'pointer-events-auto opacity-100': isLoading,
        }
      )}
    />
  );
};

export default PageLoadingProgress;
