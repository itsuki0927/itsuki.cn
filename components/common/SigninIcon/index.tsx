import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GithubOutlined } from '@/components/icons';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { getPageUrl } from '@/utils/url';

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
    <a
      href='/api/auth/sign/github'
      className='my-4 flex h-9 w-28 items-center justify-center rounded-sm bg-github text-sm text-white opacity-90 transition-opacity hover:opacity-100'
      onClick={e => handleSigin(e, 'github')}
    >
      <GithubOutlined className='mr-1' />
      <span className='capsize'>Github</span>
    </a>
  );
};

export default SigninIcon;
