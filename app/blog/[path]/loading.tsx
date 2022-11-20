import { BlogSkeleton } from '@/components/blog/BlogSkeleton';
import {
  CommentFormSkeleton,
  CommentListSkeleton,
} from '@/components/comment/CommentSkeleton';
import Layout from '@/components/common/Layout';
import { Container } from '@/components/ui';

const Loading = () => {
  return (
    <Layout>
      <Container className='space-y-6'>
        <BlogSkeleton />
        <CommentFormSkeleton />
        <CommentListSkeleton />
      </Container>
    </Layout>
  );
};

export default Loading;
