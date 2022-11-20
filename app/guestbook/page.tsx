import { getBlackList } from '@/api/blacklist';
import { getComments } from '@/api/comment';
import Layout from '@/components/common/Layout';
import Hero from '@/components/ui/Hero';
import CommentView from '@/components/comment/CommentView';
import { COMMENT_WITH_GUESTBOOK, GUESTBOOK } from '@/constants/value';

export const revalidate = 3600;

const fetchData = async () => {
  const comments = await getComments(COMMENT_WITH_GUESTBOOK);
  const blacklist = await getBlackList();

  return {
    total: comments.total,
    comments: comments.data,
    blacklist,
  };
};

const GuestBookPage = async () => {
  const { comments, total } = await fetchData();
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
        <CommentView total={total} blogId={GUESTBOOK} comments={comments} />
      </div>
    </Layout>
  );
};

export default GuestBookPage;
