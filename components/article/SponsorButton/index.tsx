import { YuanOutlined } from '@/components/icons';

interface SponsorButtonProps {
  onClick: () => void;
}
const SponsorButton = ({ onClick }: SponsorButtonProps) => (
  <button
    aria-label='sponsor article'
    type='button'
    className='h-8 min-w-[32px] items-center rounded-sm bg-danger text-sm font-medium text-white outline-none transition-colors hover:bg-danger-hover'
    onClick={onClick}
  >
    <YuanOutlined />
  </button>
);

export default SponsorButton;
