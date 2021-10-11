import React, { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import router from 'next/router';
import { getArticles } from '@/api/article';
import Card from '@/components/Card';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import useMount from '@/hooks/useMount';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './style.module.scss';

const HomeSlider = () => {
  const [articles, setArticles] = useState<SearchResponse<Article>>();

  useMount(() => {
    getArticles({ publish: 1, banner: 1 }).then(res => {
      setArticles(res);
    });
  });

  return (
    <Slider
      accessibility
      arrows
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
              width='100%'
              placeholder='empty'
              height='300'
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
