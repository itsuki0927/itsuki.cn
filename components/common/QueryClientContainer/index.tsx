'use client';

import merge from 'lodash.merge';
import { GraphQLError } from 'graphql';
import { PropsWithChildren, useState } from 'react';
import toast from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { isDev } from '@/configs/environment';
import { TIMESTAMP } from '@/constants/value';

const handlerError = (error: any) => {
  error.response?.errors?.forEach((e: GraphQLError) => {
    console.debug(e);
    if (isDev) {
      toast(`路径: /${e.path?.join('/')}`, {
        icon: '🙏',
        duration: 3500,
      });
    }
    toast.error(`信息: ${e.message}`, {
      duration: 3500,
    });
  });
};

const defaultConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: TIMESTAMP.MINIUTE,
    },
  },
};

export const createQueryClient = (config?: QueryClientConfig) => {
  const mergedConfig = merge({}, defaultConfig, config);
  return new QueryClient(mergedConfig);
};

const QueryClientContainer = ({ children }: PropsWithChildren<any>) => {
  const [queryClient] = useState(() =>
    createQueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          onError: handlerError,
          staleTime: TIMESTAMP.MINIUTE,
        },
        mutations: {
          onError: handlerError,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <Hydrate state={state}>{children}</Hydrate> */}
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default QueryClientContainer;
