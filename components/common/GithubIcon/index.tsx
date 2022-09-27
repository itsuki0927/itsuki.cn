import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { getPageUrl } from '@/utils/url';
import { StandardProps } from '@/types/common';

interface GithubIconProps extends StandardProps {
  className?: string;
  onClick?: (e: any) => void;
}

const GithubIcon = ({ className = '', onClick, children }: GithubIconProps) => {
  const router = useRouter();

  const handleSigin = (e: any) => {
    e.preventDefault();
    const path = router.asPath;
    gtag.event('login', {
      category: GAEventCategories.Comment,
      label: `login_github`,
    });
    signIn('github', {
      callbackUrl: `${getPageUrl(path)}`,
    });
    onClick?.(e);
  };

  return (
    <a
      href='/api/auth/sign/github'
      className={classNames('', className)}
      onClick={e => handleSigin(e)}
    >
      {children}
    </a>
  );
};

export default GithubIcon;
