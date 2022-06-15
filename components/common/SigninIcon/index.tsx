import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { GithubOutlined, QQOutlined } from '@/components/icons';
import { getPageUrl } from '@/utils/url';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

export type SigninType = 'github' | 'wechat' | 'qq';

const SigninIcon = () => {
  const router = useRouter();

  const handleSigin = (e: any, type: string) => {
    e.preventDefault();
    const params = `?type=${type}`;
    const path = router.asPath.replaceAll(params, '');
    gtag.event('login', {
      category: GAEventCategories.Comment,
      label: `login_${type}`,
    });
    signIn('github', {
      callbackUrl: `${getPageUrl(path)}${params}`,
    });
  };

  return (
    <div className='flex justify-center space-x-4'>
      <a
        href='/api/auth/sign/github'
        className='flex items-end rounded-sm bg-github py-1 px-3 text-sm text-white opacity-90 transition-opacity hover:opacity-100'
        onClick={e => handleSigin(e, 'github')}
      >
        <GithubOutlined className='mr-1' />
        <span className='capsize'>Github</span>
      </a>
      <a
        href='/api/auth/sign/qq'
        className='flex items-end rounded-sm bg-qq py-1 px-3 text-sm text-white opacity-90 transition-opacity hover:opacity-100'
        onClick={e => {
          e.preventDefault();
          toast.loading('秃头开发中...', {
            duration: 3000,
          });
        }}
      >
        <QQOutlined className='mr-1' />
        <span className='capsize'>QQ</span>
      </a>
    </div>
  );
};

export default SigninIcon;
