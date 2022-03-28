import { ToTopOutlined } from '@/components/icons';
import { IconButton } from '@/components/ui';
import scrollTo from '@/utils/scrollTo';

const BackTop = () => {
  const backToTop = () => scrollTo(0, 600);

  return (
    <div className='fixed right-6 bottom-24 z-10'>
      <IconButton icon={<ToTopOutlined />} onClick={backToTop} type='ghost' />
    </div>
  );
};

export default BackTop;
