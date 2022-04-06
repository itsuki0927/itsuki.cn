import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import getGravatarUrl from '@/utils/gravatar';
import { Button } from '@/components/ui';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

interface CommentFormProps {
  className?: string;
  reply?: ReactNode;
  profile?: ReactNode;
  onSend?: ({ content, save }: { content: string; save: boolean }) => Promise<boolean>;
  hiddenAvatar?: boolean;
}

const CommentForm = ({
  className,
  reply,
  onSend,
  profile: profileNode,
  hiddenAvatar,
}: CommentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleSend = async () => {
    if (!content) {
      alert('请输入评论内容');
      return false;
    }

    try {
      setLoading(true);
      onSend?.({ content, save: true }).then(() => {
        setContent('');
        setLoading(false);
        return true;
      });
    } catch (error: any) {
      const [{ message }] = error.errors;
      alert(`评论发布失败: ${message}\n`);
      // alert(
      //   `评论发布失败\n
      //  1：检查邮箱是否符合格式\n
      //  2：被 Akismet 过滤\n
      //  3：邮箱/IP 被列入黑名单\n
      //  4：内容包含黑名单关键词\n
      //   `
      // );
      return false;
    }
  };

  return (
    <div
      id='commentForm'
      className={`flex items-start ${hiddenAvatar ? '' : 'space-x-4'} ${className}`}
    >
      {hiddenAvatar ? null : (
        <Image
          className='rounded-full'
          src={
            'https://static.itsuki.cn/avatar1.jpg' || getGravatarUrl('2309899048@qq.com')
          }
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
          <div className='text-sm'>
            <input id='save' type='checkbox' className='cursor-pointer align-middle' />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor='save'
              className='ml-2 cursor-pointer align-middle text-[#777777]'
            >
              保存你的信息
            </label>
          </div>
          <Button
            type='reverse'
            disabled={loading}
            className={classNames('min-w-[96px] py-2 px-6 text-xs tracking-widest', {
              'bg-[#777]': loading,
              'pointer-events-none': loading,
            })}
            onClick={handleSend}
          >
            {loading ? '发射中...' : '发射'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
