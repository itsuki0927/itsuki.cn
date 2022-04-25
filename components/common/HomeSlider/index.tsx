import router from 'next/router';
import React from 'react';
import { Carousel } from '@/components/ui';
import ToDate from '../ToDate';
import { MyImage } from '..';
import { UseBannerArticles } from '@/hooks/article/useBannerArticles';
import { getArticleDetailUrl } from '@/utils/url';

type HomeSliderProps = {
  articles?: UseBannerArticles;
};

const HomeSlider = ({ articles }: HomeSliderProps) => (
  <Carousel autoplay={false}>
    {articles?.data?.data.map(article => (
      <div
        role='banner'
        className='group relative opacity-90 transition-opacity'
        key={article.id}
      >
        <MyImage
          src={article.cover}
          objectFit='cover'
          placeholder='empty'
          width={1050}
          height={500}
          property='0.8'
          alt='banner-cover'
          className='group-hover: rounded-sm align-middle opacity-100'
        />
        <div className='absolute top-6 right-6 rounded-sm bg-white py-2 px-6 text-center opacity-70 transition-all duration-500 hover:opacity-100 dark:bg-white--dark'>
          <header>
            <span className='text-xs tracking-tighter text-gray-1 dark:text-gray-1--dark'>
              <ToDate date={article.createAt} to='YMD' />
            </span>

            <h2
              className='cursor-pointer text-lg tracking-widest text-dark-2 hover:text-dark-4 dark:text-dark-2--dark'
              onClick={() => router.push(getArticleDetailUrl(article.id))}
            >
              {article.title}
            </h2>
          </header>
        </div>
      </div>
    ))}
  </Carousel>
);

export default HomeSlider;
