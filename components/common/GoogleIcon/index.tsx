import { MouseEvent } from 'react';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { StandardProps } from '@/types/common';
import { useAuth } from '@/libs/auth';
import { GoogleOutlined } from '@/components/icons';

interface GoogleIconProps extends StandardProps {
  onClick?: (e: MouseEvent) => void;
}

const GoogleIcon = ({ className = '', onClick }: GoogleIconProps) => {
  const { signInWithGoogle } = useAuth();

  const handleSignIn = (e: MouseEvent) => {
    e.preventDefault();
    gtag.event('login', {
      category: GAEventCategories.Comment,
      label: `login_google`,
    });
    signInWithGoogle();
    onClick?.(e);
  };

  return (
    <a href='#' className={className} onClick={handleSignIn}>
      <span className='inline-flex items-center rounded-sm border border-solid border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-100'>
        <GoogleOutlined className='mr-1' />
        <span className='capsize'>Google</span>
      </span>
    </a>
  );
};

export default GoogleIcon;
