import classNames from 'classnames';
import { SendOutlined, SyncOutlined } from '@/components/icons';

interface SendButtonProps {
  onConfirm: () => Promise<boolean>;
  nickname: string | null | undefined;
  loading?: boolean;
}

const SendButton = ({ onConfirm, loading, nickname = '无名氏' }: SendButtonProps) => (
  <button
    aria-label='push comment'
    disabled={loading}
    type='button'
    className={classNames(
      'flex select-none items-end space-x-1 bg-primary py-2 px-3 text-sm text-white outline-none transition-colors',
      loading ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:bg-primary-hover'
    )}
    onClick={onConfirm}
  >
    <span className='capsize'>{loading ? '发布中' : `以 ${nickname} 的身份发布`}</span>
    {loading ? <SyncOutlined className='animate-spin' /> : <SendOutlined />}
  </button>
);

export default SendButton;
