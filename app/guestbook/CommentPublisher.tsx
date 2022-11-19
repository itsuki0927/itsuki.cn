'use client';

import CommentPublisher from '@/components/comment/CommentPublisher';
import GoogleIcon from '@/components/common/GoogleIcon';
import GithubIcon from '@/components/icons/GithubIcon';
import SorrySvg from '@/components/icons/SorrySvg';
import LoadingDots from '@/components/ui/LoadingDots';
import Status from '@/components/ui/Status';
import useCreateComment from '@/hooks/comment/useCreateComment';
import { useAuth } from '@/libs/auth';

export interface CommentPublisherUIProps {
  blogId: number;
}

const CommentPublisherUI = ({ blogId }: CommentPublisherUIProps) => {
  const { user, loading } = useAuth();
  const { postComment, ...rest } = useCreateComment(blogId);

  if (loading && !user) {
    return (
      <div className='bg-gray-50 p-6'>
        <LoadingDots />
      </div>
    );
  }
  if (user) {
    return (
      <CommentPublisher blogId={blogId} loading={rest.isLoading} onPost={postComment} />
    );
  }

  return (
    <Status icon={<SorrySvg />} title='请先登陆' description='仅使用你的邮箱、头像和昵称'>
      <div className='mt-4 flex space-x-3'>
        <GithubIcon />
        <GoogleIcon />
      </div>
    </Status>
  );
};

export default CommentPublisherUI;