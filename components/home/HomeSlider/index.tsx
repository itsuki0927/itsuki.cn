'use client';

import classNames from 'classnames';
import router from 'next/navigation';
import { A11y, Autoplay, Keyboard, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Blog } from '@/entities/blog';
import { getBlogDetailRoute } from '@/utils/url';
import Pagination from './Pagination';
import { MyImage } from '@/components/common';

type HomeSliderProps = {
  blogs?: Blog[];
};

const HomeSlider = ({ blogs }: HomeSliderProps) => (
  <div className={classNames('w-full sm:max-w-[800px]')}>
    <Swiper
      lazy
      autoplay
      loop
      modules={[A11y, Autoplay, Lazy, Keyboard]}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      a11y={{
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      }}
    >
      {blogs?.map(blog => (
        <SwiperSlide
          role='banner'
          className='group relative flex flex-col opacity-90 transition-opacity sm:flex-row sm:pb-0 md:flex-row'
          key={blog.id}
        >
          <div className='max-w-full sm:max-h-[334px]'>
            <MyImage
              src={blog?.cover}
              alt='banner cover'
              className='object-cover sm:max-h-[334px]'
              objectFit='cover'
              width={535}
              height={334}
            />
          </div>
          <div className='w-full bg-gray-50 p-6 sm:w-1/3'>
            <div className='pb-3 text-sm text-primary'>
              {blog?.tags?.map(v => v.name).join('、')}
            </div>

            <h3
              className='mt-0 mb-2 cursor-pointer text-2xl font-semibold text-gray-900 transition-colors duration-500 hover:text-primary'
              onClick={() => router.push(getBlogDetailRoute(blog?.path))}
            >
              {blog?.title}
            </h3>

            <p className='capsize mt-0 mb-3 cursor-pointer text-gray-600'>
              {blog?.description}
            </p>

            <Pagination />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default HomeSlider;
