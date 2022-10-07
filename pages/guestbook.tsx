import { NextSeo } from 'next-seo';
import { dehydrate } from 'react-query';
import { getBlackList } from '@/api/blacklist';
import { getComments } from '@/api/comment';
import { CommentView } from '@/components/comment';
import { Layout } from '@/components/common';
import { createQueryClient } from '@/components/common/QueryClientContainer';
import { blacklistKeys, commentKeys } from '@/constants/queryKeys';
import { GUESTBOOK, TIMESTAMP } from '@/constants/value';
import { Hero } from '@/components/ui';

export const getStaticProps = async () => {
  const queryClient = createQueryClient();
  await queryClient.prefetchQuery(commentKeys.lists(GUESTBOOK), () =>
    getComments({ blogId: GUESTBOOK })
  );
  await queryClient.prefetchQuery(blacklistKeys.list, () => getBlackList());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: TIMESTAMP.DAY / 1000,
  };
};

const GuestBookPage = () => (
  <Layout footerTheme='reverse'>
    <NextSeo title='留言板' />

    <Hero>
      <Hero.BackgroundImage url='/guestbook-banner.jpg' />
      <Hero.Container>
        <Hero.Title>留言</Hero.Title>
        <Hero.Description className='sm:max-w-full'>
          我们穷尽一生，我们要学会的，不过是彼此拥抱
          <span className='mx-1'> - </span>
          <span className='text-lg text-gray-300'> 《超脱》</span>
        </Hero.Description>
      </Hero.Container>
    </Hero>

    <div className='mx-auto my-12 max-w-4xl'>
      <CommentView blogId={GUESTBOOK} />
    </div>
  </Layout>
);

export default GuestBookPage;
