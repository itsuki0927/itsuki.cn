import toast from 'react-hot-toast';
import { YuanOutlined } from '@/components/icons';

const SponsorButton = () => (
  <button
    type='button'
    className='h-8 min-w-[32px] items-center rounded-sm bg-danger text-sm font-medium text-white outline-none transition-colors hover:bg-danger-hover'
    onClick={() => {
      toast.success('感谢你的肯定, 赞赏功能还未实现');
    }}
  >
    <YuanOutlined />
  </button>
);

export default SponsorButton;
