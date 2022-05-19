import { GraphQLError } from 'graphql';
import { PropsWithChildren, useState } from 'react';
import toast from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { isDev } from '@/configs/environment';

interface QueryClientContainerProps {
  pageProps?: any;
}

const handlerError = (error: any) => {
  error.response.errors.forEach((e: GraphQLError) => {
    console.debug(e);
    if (isDev) {
      toast(`路径: /${e.path?.join('/')}`, {
        icon: '🙏',
        duration: 3500,
      });
    }
    toast.error(`信息: ${e.message}`);
  });
};

const QueryClientContainer = ({
  children,
  pageProps,
}: PropsWithChildren<QueryClientContainerProps>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            onError: handlerError,
          },
          mutations: {
            onError: handlerError,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default QueryClientContainer;
