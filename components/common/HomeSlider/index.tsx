import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import imageTransformer from '@/utils/image';
import { SearchResponse } from '@/types/response';
import { Carousel } from '@/components/ui';
import { Article } from '@/entities/article';
import ToDate from '../ToDate';

type HomeSliderProps = {
  articles?: SearchResponse<Article>;
};

const HomeSlider = ({ articles }: HomeSliderProps) => (
  <Carousel autoplay={false}>
    {articles?.data.map(article => (
      <div
        role='banner'
        onClick={() => router.push(`/article/${article.id}`)}
        className='group relative cursor-pointer opacity-90 transition-opacity'
        key={article.id}
      >
        <Image
          src={article.cover}
          objectFit='cover'
          placeholder='empty'
          width={1050}
          height={500}
          property='0.8'
          loader={imageTransformer}
          alt='banner-cover'
          className='group-hover: rounded-sm align-middle opacity-100'
        />
        <div className='absolute top-6 right-6 rounded-sm bg-white py-3 px-3 text-center text-gray-600 opacity-70 transition-all duration-500 hover:opacity-100'>
          <header className='mb-2 '>
            <span className='text-xs tracking-tighter text-[#b6b6b6]'>
              <ToDate date={article.createAt} to='YMD' />
            </span>

            <h2 className='text-lg tracking-widest text-[#2d2d2d]'>{article.title}</h2>
          </header>
        </div>
      </div>
    ))}
  </Carousel>
);

export default HomeSlider;
