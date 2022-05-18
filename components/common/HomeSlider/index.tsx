import router from 'next/router';
import React from 'react';
import { Carousel } from '@/components/ui';
import ToDate from '../ToDate';
import { MyImage } from '..';
import { getArticleDetailUrl } from '@/utils/url';
import { SiteInfo } from '@/entities/siteInfo';

type HomeSliderProps = {
  articles?: SiteInfo['bannerArticles'];
};

const HomeSlider = ({ articles }: HomeSliderProps) => (
  <Carousel autoplay={false}>
    {articles?.map(article => (
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
        <div className='absolute top-6 right-6 rounded-sm bg-white py-2 px-6 text-center opacity-70 transition-all duration-500 hover:opacity-100 '>
          <header>
            <span className='text-xs tracking-tighter text-gray-1 '>
              <ToDate date={article.createAt ?? new Date()} to='YMD' />
            </span>

            <h2
              className='cursor-pointer text-lg tracking-widest text-dark-2 hover:text-dark-4 '
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
