import classNames from 'classnames';
import { ReactNode } from 'react';
import { Loader, Send } from 'react-feather';

interface SendButtonProps {
  onConfirm: () => Promise<boolean>;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}

const SendButton = ({ onConfirm, loading, children, className }: SendButtonProps) => (
  <button
    aria-label='push comment'
    disabled={loading}
    type='button'
    className={classNames(
      'flex select-none items-center space-x-1 bg-primary text-sm text-white outline-none transition-colors',
      loading ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:bg-primary-hover',
      className
    )}
    onClick={onConfirm}
  >
    {children}
    {loading ? <Loader className='animate-spin' size={16} /> : <Send size={16} />}
  </button>
);

export default SendButton;
