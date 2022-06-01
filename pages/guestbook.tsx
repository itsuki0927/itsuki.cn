import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import { CommentView } from '@/components/comment';
import { Layout } from '@/components/common';
import { globalDataKeys } from '@/constants/queryKeys';
import { GUESTBOOK } from '@/constants/value';
import { Banner } from '@/components/ui';

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
    <Banner
      title='留言板'
      description='请在下方留言。它可以是探讨技术、了解生活，甚至来一个段子。给我一个大惊喜!'
    />
    <CommentView articleId={GUESTBOOK} />
  </div>
);

GuestBookPage.getLayout = (page: ReactNode) => <Layout>{page} </Layout>;

export default GuestBookPage;
