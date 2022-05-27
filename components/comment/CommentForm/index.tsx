import { signOut } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { MyImage } from '@/components/common';
import { GithubOutlined, QQOutlined, WechatOutlined } from '@/components/icons';

interface CommentFormProps {
  className?: string;
  avatar: string | null | undefined;
  hiddenLogout?: boolean;
  children?: ReactNode;
  loginType?: string;
}

const CommentForm = ({
  className,
  avatar,
  hiddenLogout,
  children,
  loginType,
}: CommentFormProps) => (
  <div id='commentForm' className={`flex items-start space-x-4 ${className}`}>
    <div className='min-w-[55px]'>
      <div className='relative'>
        <MyImage
          className='rounded-md border-4 border-solid border-white-3'
          imgClassName='rounded-md'
          src={avatar ?? ''}
          width={55}
          height={55}
          alt='cover'
        />
        <span className='absolute right-0 bottom-0 w-[40%] rounded-sm bg-[#00000033] text-center'>
          {loginType === 'github' && <GithubOutlined className='leading-5 text-github' />}
          {loginType === 'qq' && <QQOutlined className='leading-5 text-qq' />}
          {loginType === 'wechat' && <WechatOutlined className='leading-5 text-wechat' />}
        </span>
      </div>

      {!hiddenLogout && (
        <span
          tabIndex={0}
          role='button'
          className='block text-center text-xs text-gray-1 transition-colors hover:text-dark-1'
          onClick={() => signOut()}
        >
          退出
        </span>
      )}
    </div>

    {children}
  </div>
);

export default CommentForm;
