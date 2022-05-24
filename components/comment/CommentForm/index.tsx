import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import React, { ReactNode, useState } from 'react';
import { MyImage } from '@/components/common';
import SendButton from '../SendButton';
import getGravatarUrl from '@/utils/gravatar';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

interface CommentFormProps {
  className?: string;
  profile?: ReactNode;
  onSend: (content: string) => Promise<boolean>;
  hiddenAvatar?: boolean;
  email?: string;
}

const CommentForm = ({
  className,
  onSend,
  profile: profileNode,
  hiddenAvatar,
  email,
}: CommentFormProps) => {
  const [content, setContent] = useState('');

  const handleSend = () =>
    onSend(content).then(
      () => {
        setContent('');
        return true;
      },
      (error: any) => {
        const { message } = error || { message: '' };
        toast.error(`评论发布失败: ${message}\n`);
        return false;
      }
    );

  return (
    <div
      id='commentForm'
      className={`flex items-start ${hiddenAvatar ? '' : 'space-x-4'} ${className}`}
    >
      {hiddenAvatar ? null : (
        <MyImage
          className='min-w-[45px]'
          imgClassName='rounded-full'
          src={getGravatarUrl(email ?? '')}
          width={45}
          height={45}
          alt='cover'
        />
      )}

      <div
        className='flex-grow space-y-4'
        style={{
          maxWidth: hiddenAvatar ? '100%' : 'calc(100% - 61px)',
        }}
      >
        {profileNode}
        <DynamicMarkdown code={content} onChange={setContent} placeholder='见解(必填)' />

        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-2 '>
            Tip: 不会泄漏邮箱, 支持Markdown, 还请友善评论.
          </div>
          <SendButton onConfirm={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
