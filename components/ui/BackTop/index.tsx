import { ToTopOutlined } from '@/components/icons';
import { IconButton } from '@/components/ui';
import scrollTo from '@/utils/scrollTo';

const BackTop = () => {
  const backToTop = () => scrollTo(0, 600);

  return (
    <div className='fixed bottom-36 right-6 z-10'>
      <IconButton
        role='button'
        className='px-4 py-2'
        icon={<ToTopOutlined />}
        onClick={backToTop}
      />
    </div>
  );
};

export default BackTop;
