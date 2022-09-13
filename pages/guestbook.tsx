import { dehydrate, QueryClient } from 'react-query';
import { NextSeo } from 'next-seo';
import { getBlackList } from '@/api/blacklist';
import { getComments } from '@/api/comment';
import { CommentView } from '@/components/comment';
import { Layout } from '@/components/common';
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
  <Layout>
    <NextSeo title='留言板' />

    <div className='relative max-h-72 items-center overflow-hidden sm:max-h-[402px]'>
      <img
        src='/guestbook-banner.jpg'
        className='max-h-[402px] w-full object-cover'
        alt='archive banner'
      />
      <div className='container absolute top-0 bottom-0  left-0 right-0 flex flex-col justify-center px-4'>
        <h1 className='mb-6 text-3xl font-medium tracking-tight text-gray-100 sm:text-5xl'>
          留言
        </h1>
        <p className='text-xl text-gray-200'>
          我们穷尽一生，我们要学会的，不过是彼此拥抱
          <span className='mx-1'> - </span>
          <span className='text-lg text-gray-300'> 《超脱》</span>
        </p>
      </div>
    </div>

    <div className='mx-auto mb-12 max-w-4xl'>
      <CommentView articleId={GUESTBOOK} />
    </div>
  </Layout>
);

export default GuestBookPage;
