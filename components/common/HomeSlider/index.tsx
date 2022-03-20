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
        className='opacity-90 transition-opacity cursor-pointer relative group'
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
          className='rounded-sm group-hover: opacity-100'
        />
        <div className='absolute top-6 right-6 py-1 px-4 bg-gray-50 opacity-70 text-gray-600 transition-all rounded-sm hover:text-gray-900 hover:opacity-90'>
          <span>{article.title}</span>
        </div>
      </div>
    ))}
  </Carousel>
);

export default HomeSlider;
