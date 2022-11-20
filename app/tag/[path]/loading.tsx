import { BlogSkeletonList } from '@/components/blog/BlogSkeleton';
import Layout from '@/components/common/Layout';
import Container from '@/components/ui/Container';

const Loading = () => (
  <Layout>
    <Container className='space-y-6'>
      <BlogSkeletonList />
    </Container>
  </Layout>
);

export default Loading;
