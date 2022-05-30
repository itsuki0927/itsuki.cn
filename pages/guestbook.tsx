import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import { CommentView } from '@/components/comment';
import { Layout } from '@/components/common';
import { globalDataKeys } from '@/constants/queryKeys';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const GuestBookPage = () => (
  <div className='space-y-6'>
    <CommentView articleId={9} />
  </div>
);

GuestBookPage.getLayout = (page: ReactNode) => <Layout>{page} </Layout>;

export default GuestBookPage;
