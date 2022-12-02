import { MouseEvent } from 'react';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { StandardProps } from '@/types/common';
import { GithubOutlined } from '@/components/icons';

interface GithubIconProps extends StandardProps {
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const GithubIcon = ({ className = '', onClick }: GithubIconProps) => {
  const handleSignIn = (e: MouseEvent) => {
    gtag.event('login', {
      category: GAEventCategories.Comment,
      label: `login_github`,
    });
    onClick?.(e);
  };

  return (
    <button type='button' className={className} onClick={handleSignIn}>
      <span className='inline-flex items-center rounded-sm border border-solid border-github bg-github px-4 py-2 text-sm text-white opacity-90 transition-opacity hover:opacity-100'>
        <GithubOutlined className='mr-1' />
        <span className='capsize'>Github</span>
      </span>
    </button>
  );
};

export default GithubIcon;
