import { dehydrate, QueryClient } from 'react-query';
import { NextSeo } from 'next-seo';
import { getBlackList } from '@/api/blacklist';
import { getComments } from '@/api/comment';
import { CommentView } from '@/components/comment';
import { Layout, Navbar } from '@/components/common';
import { Banner } from '@/components/ui';
import { blacklistKeys, commentKeys } from '@/constants/queryKeys';
import { GUESTBOOK } from '@/constants/value';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(commentKeys.lists(GUESTBOOK), () =>
    getComments(GUESTBOOK)
  );
  await queryClient.prefetchQuery(blacklistKeys.list, () => getBlackList());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const GuestBookPage = () => (
  <Layout
    hero={
      <div className='space-y-20 bg-white py-10'>
        <Navbar />

        <div className='container px-4'>
          <Banner title='留言板' description='世界很大, 我们总会相遇' />
        </div>
      </div>
    }
  >
    <NextSeo title='留言板' />
    <div className='mx-auto max-w-3xl space-y-6'>
      <CommentView articleId={GUESTBOOK} />
    </div>
  </Layout>
);

export default GuestBookPage;
