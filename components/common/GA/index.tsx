import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useEffect } from 'react';
import { GA_TRACKING_ID } from '@/configs/app';
import { isProd } from '@/configs/environment';
import { CustomWindow } from '@/types/window';
import { pageview } from '@/utils/gtag';

declare const window: CustomWindow;

const GA = () => {
  const router = useRouter();
  const needGA = !!(isProd && GA_TRACKING_ID);

  const handleRouteChange = useCallback(
    (url: string) => {
      if (needGA && window.gtag) {
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
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          if (window.gtag == null) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
              // eslint-disable-next-line prefer-rest-params
              window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());

            window.gtag('config', GA_TRACKING_ID, {
              page_path: window.location.pathname,
            });
          }
          console.log('loaded', window.gtag, window.dataLayer);
        }}
        onError={() => {
          console.error('[ gtag ]: loaded error');
        }}
      />
    </>
  ) : null;
};

export default GA;
