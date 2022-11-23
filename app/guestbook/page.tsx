import { Suspense } from 'react';
import Layout from '@/components/common/Layout';
import Hero from '@/components/ui/Hero';
import CommentView from '@/components/comment/CommentView';
import { GUESTBOOK } from '@/constants/value';
import { CommentListSkeleton } from '@/components/comment/CommentSkeleton';

export const revalidate = 3600;

const GuestBookPage = async () => {
  return (
    <Layout footerTheme='reverse'>
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
        <Suspense fallback={<CommentListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <CommentView blogId={GUESTBOOK} />
        </Suspense>
      </div>
    </Layout>
  );
};

export default GuestBookPage;
