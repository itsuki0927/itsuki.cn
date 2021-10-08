/* eslint-disable no-console */
import '@/components/Alert/style.scss';
import '@/components/Button/style.scss';
import '@/components/Card/style.scss';
import '@/styles/globals.scss';
import '@/styles/markdown.scss';
import '@/styles/reset.scss';
import { fetchGlobalData } from 'api/global';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useReducer, useState } from 'react';
import AppContext, { AppContextType } from '@/utils/context';
import useMount from '@/hooks/useMount';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';

type AppActionType =
  | {
      type: 'SUCCESS';
      payload: AppContextType;
    }
  | { type: 'ERROR'; payload: string }
  | { type: 'CALL' };

type State = {
  error?: string;
  data?: AppContextType;
  loading?: boolean;
};

const initialState = {
  error: '',
  data: {},
  loading: false,
};

const reducer = (state: State = initialState, action: AppActionType) => {
  switch (action.type) {
    case 'SUCCESS':
      return { ...state, data: { ...action.payload }, loading: false };
    case 'CALL':
      return { ...state, loading: true };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useMount(() => {
    dispatch({ type: 'CALL' });
    fetchGlobalData().then(
      data => {
        dispatch({ type: 'SUCCESS', payload: data });
      },
      err => {
        dispatch({ type: 'ERROR', payload: err });
      }
    );
  });

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`[Loading: ${url}]`);
      setLoading(true);
      NProgress.start();
    };
    const handleStop = () => {
      console.log('[Loaded]');
      setLoading(false);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <AppContext.Provider value={state.data!}>
      <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>
    </AppContext.Provider>
  );
}
export default MyApp;
