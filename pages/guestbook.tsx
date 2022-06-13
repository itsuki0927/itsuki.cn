import { dehydrate, QueryClient } from 'react-query';
import { CommentView } from '@/components/comment';
import { Layout, Navbar } from '@/components/common';
import { blacklistKeys, commentKeys } from '@/constants/queryKeys';
import { GUESTBOOK } from '@/constants/value';
import { Banner } from '@/components/ui';
import { getComments } from '@/api/comment';
import { getBlackList } from '@/api/blacklist';

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
    <div className='mx-auto max-w-2xl space-y-6 bg-white'>
      <CommentView articleId={GUESTBOOK} />
    </div>
  </Layout>
);

export default GuestBookPage;
