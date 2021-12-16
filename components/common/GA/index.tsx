import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useEffect } from 'react';
import { GA_TRACKING_ID } from '@/configs/app';
import { isProd } from '@/configs/environment';
import { pageview } from '@/utils/gtag';

const GA = () => {
  const router = useRouter();
  const needGA = !!(isProd && GA_TRACKING_ID);

  const handleRouteChange = useCallback(
    (url: string) => {
      if (needGA) {
        pageview(url);
      }
    },
    [needGA]
  );

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, [handleRouteChange, router.events]);

  return needGA ? (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  ) : null;
};

export default GA;
