import '@/components/Alert/style.scss';
import '@/components/Button/style.scss';
import '@/components/Card/style.scss';
import Layout from '@/components/Layout';
import '@/styles/globals.scss';
import '@/styles/reset.scss';
import '@/styles/markdown.scss';
import AppContext, { AppContextType } from '@/utils/context';
import { fetchGlobalData } from 'api/global';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useReducer } from 'react';

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
  data: undefined,
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
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: 'CALL' });
    fetchGlobalData().then(
      data => {
        dispatch({ type: 'SUCCESS', payload: data });
      },
      err => {
        dispatch({ type: 'ERROR', payload: err });
      }
    );
  }, []);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`[Loading: ${url}]`);
      NProgress.start();
    };
    const handleStop = () => {
      console.log('[Loaded]');
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

  return (
    <AppContext.Provider value={state.data!}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
export default MyApp;
