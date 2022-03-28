import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import imageTransformer from '@/utils/image';
import { SearchResponse } from '@/types/response';
import { Carousel } from '@/components/ui';
import { Article } from '@/entities/article';

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
          width={856}
          height={300}
          loader={imageTransformer}
          alt='banner-cover'
          className='group-hover: rounded-sm opacity-100'
        />
        <div className='absolute top-6 right-6 rounded-sm bg-gray-100 py-1 px-4 text-gray-600 opacity-40 transition-all hover:opacity-90'>
          <span>{article.title}</span>
        </div>
      </div>
    ))}
  </Carousel>
);

export default HomeSlider;
