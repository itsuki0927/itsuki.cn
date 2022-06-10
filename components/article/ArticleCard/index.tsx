import { CSSProperties } from 'react';
import router from 'next/router';
import { MyImage, ToDate } from '@/components/common';
import { Article } from '@/entities/article';
import s from './style.module.scss';
import { getArticleDetailRoute } from '@/utils/url';

type ArticleCardProps = {
  article: Article;
  style?: CSSProperties;
};

const ArticleCard = ({ article, style }: ArticleCardProps) => (
  <article
    className={`group mb-8 flex w-full flex-col px-4 md:w-1/3 lg:w-1/3 ${s.card}`}
    style={style}
  >
    <MyImage
      alt='article-cover'
      width={368}
      height={276}
      layout='responsive'
      src={article.cover}
      objectFit='cover'
      className='cursor-pointer opacity-90 transition-opacity group-hover:opacity-100'
      onClick={() => router.push(getArticleDetailRoute(article.id))}
    />

    <p className='mt-5 mb-3 text-sm text-gray-2 before:border-l-2 before:border-l-primary before:pr-2'>
      {article.tags?.map(v => v.name).join('、')}
    </p>

    <h3
      className='mt-0 mb-3 cursor-pointer text-lg text-dark-2 transition-colors duration-500 line-clamp-1 hover:text-primary'
      onClick={() => router.push(getArticleDetailRoute(article.id))}
    >
      {article.title}
    </h3>

    <div className='mb-1 flex items-end space-x-6 text-sm text-gray-2'>
      <ToDate date={article.createAt} />
      <span className='mx-2'>/</span>
      {article.author}
    </div>
  </article>
);

export default ArticleCard;
