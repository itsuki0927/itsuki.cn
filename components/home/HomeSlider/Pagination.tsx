import React from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useSwiper } from 'swiper/react';

const Pagination = () => {
  const swiper = useSwiper();
  return (
    <div className='absolute right-0 bottom-0'>
      <button
        type='button'
        className='border-r border-solid border-r-gray-200 bg-gray-100 p-4 transition-colors hover:bg-gray-200'
        // TODO: 埋点
        onClick={() => swiper.slidePrev()}
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type='button'
        className='bg-gray-100 p-4 transition-colors hover:bg-gray-200'
        // TODO: 埋点
        onClick={() => swiper.slideNext()}
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
