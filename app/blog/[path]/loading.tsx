import { BlogSkeleton } from '@/components/blog/BlogSkeleton';
import {
  CommentFormSkeletion,
  CommentListSkeleton,
} from '@/components/comment/CommentSkeleton';
import Layout from '@/components/common/Layout';

const Loading = () => {
  return (
    <Layout>
      <div className='container space-y-6'>
        <BlogSkeleton />
        <CommentFormSkeletion />
        <CommentListSkeleton />
      </div>
    </Layout>
  );
};

export default Loading;
