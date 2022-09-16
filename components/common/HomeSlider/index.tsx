import classNames from 'classnames';
import router from 'next/router';
import { A11y, Autoplay, Keyboard, Lazy, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MyImage } from '..';
import { Article } from '@/entities/article';
import { getBlogDetailRoute } from '@/utils/url';
import s from './style.module.css';

type HomeSliderProps = {
  articles?: Article[];
};

const HomeSlider = ({ articles }: HomeSliderProps) => (
  <div className={classNames('sm:max-w-[800px]', s.slider)}>
    <Swiper
      lazy
      /* autoplay */
      loop
      modules={[Pagination, A11y, Autoplay, Lazy, Keyboard]}
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      a11y={{
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      }}
    >
      {articles?.map(article => (
        <SwiperSlide
          role='banner'
          className='group relative flex pb-6 opacity-90 transition-opacity sm:pb-0 md:flex-row'
          key={article.id}
        >
          <div className='max-w-full sm:max-h-[316px]'>
            <MyImage src={article?.cover} objectFit='cover' width={535} height={302} />
          </div>
          <div className='w-full bg-gray-50 sm:w-1/3 sm:px-5'>
            <div className='pt-8 pb-3 text-sm text-primary'>
              {article?.tags?.map(v => v.name).join('、')}
            </div>

            <h3
              className='mt-0 mb-2 cursor-pointer text-2xl font-semibold text-gray-900 transition-colors duration-500 line-clamp-1 hover:text-primary'
              onClick={() => router.push(getBlogDetailRoute(article?.path))}
            >
              {article?.title}
            </h3>

            <p className='capsize mt-0 mb-3 cursor-pointer text-gray-600'>
              {article?.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default HomeSlider;
