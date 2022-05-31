import { signOut } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import CommentAvatar from '../CommentAvatar';

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
      <CommentAvatar avatar={avatar} loginType={loginType} />

      {!hiddenLogout && (
        <span
          tabIndex={0}
          role='button'
          className='block text-center text-xs text-gray-1 transition-colors hover:text-dark-1'
          onClick={() => {
            gtag.event('signout', {
              category: GAEventCategories.Comment,
            });
            signOut();
          }}
        >
          退出
        </span>
      )}
    </div>

    {children}
  </div>
);

export default CommentForm;
