import classNames from 'classnames';
import router from 'next/router';
import { A11y, Autoplay, Keyboard, Lazy, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MyImage } from '..';
import { Article } from '@/entities/article';
import { getArticleDetailRoute } from '@/utils/url';
import ToDate from '../ToDate';
import s from './style.module.css';

type HomeSliderProps = {
  articles?: Article[];
};

const HomeSlider = ({ articles }: HomeSliderProps) => (
  <div className={classNames('container px-4', s.slider)}>
    <Swiper
      lazy
      autoplay
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
          className='group relative flex flex-col items-start pb-6 opacity-90 transition-opacity sm:pb-0 md:flex-row md:items-center'
          key={article.id}
        >
          <div className='max-w-full sm:max-h-[320px] sm:max-w-[500px]'>
            <MyImage src={article?.cover} objectFit='cover' width={500} height={320} />
          </div>
          <div className='prose w-full sm:w-fit sm:max-w-[calc(100%-540px)] md:ml-10'>
            <p className='mt-5 mb-3 text-gray-2 before:border-l-2 before:border-l-primary before:pr-2'>
              {article?.tags?.map(v => v.name).join('、')}
            </p>

            <h3
              className='mt-0 mb-3 cursor-pointer text-2xl text-dark-2 transition-colors duration-500 line-clamp-1 hover:text-primary'
              onClick={() => router.push(getArticleDetailRoute(article?.id))}
            >
              {article?.title}
            </h3>

            <p className='capsize mt-0 mb-3 cursor-pointer text-lg text-gray-3 line-clamp-1'>
              {article?.description}
            </p>

            <div className='mb-1 flex items-end space-x-6 text-gray-2'>
              <ToDate date={article?.createAt} />
              <span className='mx-2'>/</span>
              {article?.author}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default HomeSlider;
