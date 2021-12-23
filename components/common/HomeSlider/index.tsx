import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import imageTransformer from '@/utils/image';
import { SearchResponse } from '@/types/response';
import { Carousel } from '@/components/ui';
import { Article } from '@/entities/article';
import styles from './style.module.scss';

type HomeSliderProps = {
  articles?: SearchResponse<Article>;
};

const HomeSlider = ({ articles }: HomeSliderProps) => (
  <Carousel autoplay={false} className={styles.swiper}>
    {articles?.data.map(article => (
      <div
        role='banner'
        onClick={() => router.push(`/article/${article.id}`)}
        className={styles.article}
        key={article.id}
      >
        <Image
          src={article.cover}
          objectFit='cover'
          placeholder='empty'
          width={824}
          height={300}
          loader={imageTransformer}
          alt='banner-cover'
        />
        <div className={styles.text}>
          <span className={styles.title}>{article.title}</span>
        </div>
      </div>
    ))}
  </Carousel>
);

export default HomeSlider;
