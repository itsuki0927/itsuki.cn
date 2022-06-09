import { ToTopOutlined } from '@/components/icons';
import scrollTo from '@/utils/scrollTo';

const BackTop = () => {
  const backToTop = () => scrollTo(0, 600);

  return (
    <div className='fixed bottom-9 right-4 z-10 sm:bottom-36'>
      <button
        type='button'
        className='rounded-sm bg-primary px-3 py-1 text-white opacity-40 transition-opacity duration-300 hover:opacity-100'
        onClick={backToTop}
      >
        <ToTopOutlined />
      </button>
    </div>
  );
};

export default BackTop;
