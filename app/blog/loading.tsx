// TODO: skeleton

import { BlogSkeletonList } from '@/components/blog/BlogSkeleton';
import Layout from '@/components/common/Layout';
import Container from '@/components/ui/Container';

const Loading = () => {
  return (
    <Layout>
      <Container>
        <BlogSkeletonList />
      </Container>
    </Layout>
  );
};

export default Loading;
