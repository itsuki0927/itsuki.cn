import dynamic from 'next/dynamic';
import React, { ReactNode, useState } from 'react';
import { MyImage } from '@/components/common';
import SendButton from '../SendButton';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

interface CommentFormProps {
  className?: string;
  reply?: ReactNode;
  profile?: ReactNode;
  onSend: (content: string) => Promise<boolean>;
  hiddenAvatar?: boolean;
}

const CommentForm = ({
  className,
  reply,
  onSend,
  profile: profileNode,
  hiddenAvatar,
}: CommentFormProps) => {
  const [content, setContent] = useState('');

  const handleSend = () =>
    onSend(content).then(
      () => {
        setContent('');
        return true;
      },
      (error: any = { message: '' }) => {
        const { message } = error;
        // setLoading(false);
        alert(`评论发布失败: ${message}\n`);
        return false;
        // alert(
        //   `评论发布失败\n
        //  1：检查邮箱是否符合格式\n
        //  2：被 Akismet 过滤\n
        //  3：邮箱/IP 被列入黑名单\n
        //  4：内容包含黑名单关键词\n
        //   `
        // );
      }
    );

  return (
    <div
      id='commentForm'
      className={`flex items-start ${hiddenAvatar ? '' : 'space-x-4'} ${className}`}
    >
      {hiddenAvatar ? null : (
        <MyImage
          className='min-w-[60px]'
          imgClassName='rounded-full'
          src='https://static.itsuki.cn/avatar.jpg'
          width={60}
          height={60}
          alt='cover'
        />
      )}

      <div className='mb-4 flex-grow space-y-3'>
        {reply}
        {profileNode}

        <DynamicMarkdown code={content} onChange={setContent} />
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-2 dark:text-gray-2--dark'>
            邮箱不会被泄漏, 放心评论吧
          </div>
          <SendButton onConfirm={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
