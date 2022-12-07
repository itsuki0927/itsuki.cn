'use client';

/* import CommentPublisherUI from './CommentPublisherUI'; */
import dynamic from 'next/dynamic';
import GoogleIcon from '@/components/common/GoogleIcon';
import GithubIcon from '@/components/common/GithubIcon';
import SorrySvg from '@/components/icons/SorrySvg';
import LoadingDots from '@/components/ui/LoadingDots';
import Status from '@/components/ui/Status';
import useCreateComment from '@/hooks/comment/useCreateComment';
import { useAuth } from '@/libs/auth';
import { canUseDOM } from '@/utils/query';

const CommentPublisherUI = dynamic(() => import('./CommentPublisherUI'), {
  ssr: false,
  loading: () => (
    <div>
      <LoadingDots />
      ........
    </div>
  ),
});

export interface CommentPublisherUIProps {
  blogId: number;
}

const CommentPublisher = ({ blogId }: CommentPublisherUIProps) => {
  const { user, loading, signInWithGithub, signInWithGoogle, ...rest } = useAuth();
  console.log('signInWithGoogle', signInWithGoogle);
  console.log('rest', rest);
  console.log('user', user);
  console.log('loading', loading);
  console.log('typeof document', typeof document);
  console.log('canUseDOM', canUseDOM);
  const { postComment, isLoading: postLoading } = useCreateComment(blogId);

  if (loading || typeof document === 'undefined') {
    return (
      <div className='bg-gray-50 p-6'>
        <LoadingDots />
      </div>
    );
  }

  if (user) {
    return (
      <CommentPublisherUI blogId={blogId} loading={postLoading} onPost={postComment} />
    );
  }

  return (
    <Status
      icon={<SorrySvg />}
      title='请先登陆'
      description='仅使用你的邮箱、头像和昵称(挂一个梯子)'
    >
      <div className='mt-4 flex space-x-3'>
        <GithubIcon onClick={signInWithGithub} />
        <GoogleIcon onClick={signInWithGoogle} />
      </div>
    </Status>
  );
};

export default CommentPublisher;
