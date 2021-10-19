import dynamic from 'next/dynamic';
import Image from 'next/image';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { getArticles } from '@/api/article';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import imageTransformer from '@/transformers/image';
import 'slick-carousel/slick/slick.css';
import styles from './style.module.scss';

const Slider = dynamic(() => import('react-slick'));
const Card = dynamic(() => import('@/components/Card'));

const HomeSlider = () => {
  const [articles, setArticles] = useState<SearchResponse<Article>>();

  useEffect(() => {
    let isCancel = false;
    getArticles({ publish: 1, banner: 1 }).then(res => {
      if (!isCancel) {
        setArticles(res);
      }
    });

    return () => {
      isCancel = true;
    };
  }, []);

  return (
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
              width='100%'
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
};

export default HomeSlider;
