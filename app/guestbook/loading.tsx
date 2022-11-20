import {
  CommentFormSkeleton,
  CommentListSkeleton,
} from '@/components/comment/CommentSkeleton';
import Layout from '@/components/common/Layout';
import Container from '@/components/ui/Container';

const Loading = () => {
  return (
    <Layout>
      <Container className='sm:max-w-5xl'>
        <CommentFormSkeleton />
        <CommentListSkeleton />
      </Container>
    </Layout>
  );
};

export default Loading;
