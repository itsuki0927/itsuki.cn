import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { GithubOutlined, QQOutlined } from '@/components/icons';
import { getPageUrl } from '@/utils/url';

export type SigninType = 'github' | 'wechat' | 'qq';

const SigninIcon = () => {
  const router = useRouter();
  return (
    <div className='flex justify-center space-x-4'>
      <a
        href='/api/auth/sign/github'
        className='flex items-center rounded-sm bg-github py-1 px-3 text-sm text-white opacity-90 transition-opacity hover:opacity-100'
        onClick={e => {
          e.preventDefault();
          signIn('github', {
            callbackUrl: `${getPageUrl(router.asPath)}?type=github`,
          });
        }}
      >
        <GithubOutlined className='mr-1 align-baseline' />
        Github
      </a>
      <a
        href='/api/auth/sign/qq'
        className='flex items-center rounded-sm bg-qq py-1 px-3 text-sm text-white opacity-90 transition-opacity hover:opacity-100'
        onClick={e => {
          e.preventDefault();
          toast.loading('秃头开发中...', {
            duration: 3000,
          });
        }}
      >
        <QQOutlined className='mr-1 align-baseline' />
        QQ
      </a>
    </div>
  );
};

export default SigninIcon;
