import classNames from 'classnames';
import { SendOutlined, SyncOutlined } from '@/components/icons';

interface SendButtonProps {
  onConfirm: () => Promise<boolean>;
  isLoading: boolean;
  nickname: string | null | undefined;
}

const SendButton = ({ onConfirm, isLoading, nickname = '无名氏' }: SendButtonProps) => (
  <button
    disabled={isLoading}
    type='button'
    className={classNames(
      'flex select-none items-end space-x-1 bg-primary py-2 px-3 text-sm text-white outline-none transition-colors',
      isLoading
        ? 'cursor-not-allowed opacity-80'
        : 'cursor-pointer hover:bg-primary-hover'
    )}
    onClick={onConfirm}
  >
    <span className='capsize'>{isLoading ? '发布中' : `以 ${nickname} 的身份发布`}</span>
    {isLoading ? <SyncOutlined className='animate-spin' /> : <SendOutlined />}
  </button>
);

export default SendButton;
