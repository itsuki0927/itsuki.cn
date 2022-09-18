import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GithubOutlined } from '@/components/icons';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { getPageUrl } from '@/utils/url';

interface GithubIconProps {
  className?: string;
}

const GithubIcon = ({ className = '' }: GithubIconProps) => {
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
      className={classNames(
        'inline-flex items-center rounded-sm bg-github px-4 py-2 text-sm text-white opacity-90 transition-opacity hover:opacity-100',
        className
      )}
      onClick={e => handleSigin(e, 'github')}
    >
      <GithubOutlined className='mr-1' />
      <span className=''>Github</span>
    </a>
  );
};

export default GithubIcon;
