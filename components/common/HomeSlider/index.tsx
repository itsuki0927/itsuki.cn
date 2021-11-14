import dynamic from 'next/dynamic';
import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import { imageTransformer } from '@/transformers/index';
import { SearchResponse } from '@/entities/response/base';
import { Article } from '@/entities/article';
import 'slick-carousel/slick/slick.css';
import styles from './style.module.scss';

const Slider = dynamic(() => import('react-slick'));
const Card = dynamic(() => import('@/components/ui/Card'));

type HomeSliderProps = {
  articles?: SearchResponse<Article>;
};

const HomeSlider = ({ articles }: HomeSliderProps) => (
  <Slider
    accessibility
    arrows={false}
    autoplay
    infinite
    autoplaySpeed={5000}
    className={styles.swiper}
  >
    {articles?.data.map(article => (
      <Card
        onClick={() => router.push(`/article/${article.id}`)}
        className={styles.article}
        cover={
          <Image
            src={article.cover}
            objectFit='cover'
            placeholder='empty'
            width={824}
            height={300}
            loader={imageTransformer}
            alt='banner-cover'
          />
        }
        key={article.id}
      >
        <div className={styles.text}>
          <span className={styles.title}>
            <strong>{article.title}</strong>
          </span>
          <span className={styles.description}>{article.description}</span>
        </div>
      </Card>
    ))}
  </Slider>
);

export default HomeSlider;
