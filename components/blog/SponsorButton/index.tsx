import { YuanOutlined } from '@/components/icons';

interface SponsorButtonProps {
  onClick: () => void;
}
const SponsorButton = ({ onClick }: SponsorButtonProps) => (
  <button
    aria-label='sponsor article'
    type='button'
    className='h-8 items-center rounded-sm bg-white px-2 text-sm font-medium text-danger outline-none transition-colors hover:bg-danger hover:text-white'
    onClick={onClick}
  >
    <YuanOutlined />
  </button>
);

export default SponsorButton;
