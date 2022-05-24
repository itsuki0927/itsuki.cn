import { CSSProperties } from 'react';
import router from 'next/router';
import { MyImage, ToDate } from '@/components/common';
import { Article } from '@/entities/article';
import { MessageOutlined, EyeOutlined, LikeOutlined } from '@/components/icons';
import s from './style.module.scss';
import { getArticleDetailUrl } from '@/utils/url';

type ArticleCardProps = {
  article: Article;
  style?: CSSProperties;
};

const ArticleCard = ({ article, style }: ArticleCardProps) => (
  <article className={`group flex rounded-sm bg-white p-4 ${s.card}`} style={style}>
    <MyImage
      alt='article-cover'
      width={286}
      height={200}
      objectFit='cover'
      src={article.cover}
      className='min-w-[286px]'
      imgClassName='opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100'
      onClick={() => router.push(getArticleDetailUrl(article.id))}
    />
    <div className='ml-4 flex flex-grow flex-col items-start justify-between'>
      <header className='mt-1 mb-1'>
        <span className='block text-xs text-gray-2'>
          <ToDate date={article.createAt} />
        </span>

        <h3
          className='cursor-pointer tracking-widest text-dark-2 transition-colors duration-500 line-clamp-1 hover:text-primary'
          onClick={() => router.push(getArticleDetailUrl(article.id))}
        >
          {article.title}
        </h3>
      </header>

      <div className='mt-2 mb-2 flex-grow text-sm tracking-wider'>
        <p className='line-clamp-2'>{article.description}</p>
      </div>

      <button
        type='button'
        onClick={() => router.push(getArticleDetailUrl(article.id))}
        className='mb-3 rounded-sm bg-white-1 py-2 px-6 text-xs tracking-widest text-primary transition-colors duration-300 hover:bg-primary hover:text-white'
      >
        READ MORE
      </button>

      <div className='mb-1 flex items-end space-x-6 text-xs text-gray-1'>
        <span>
          <LikeOutlined className='mr-1 text-xs' />
          {article.liking}
        </span>
        <span>
          <EyeOutlined className='mr-1 text-xs' />
          {article.reading}
        </span>
        <span>
          <MessageOutlined className='mr-1 text-xs' />
          {article.commenting}
        </span>
      </div>
    </div>
  </article>
);

export default ArticleCard;
