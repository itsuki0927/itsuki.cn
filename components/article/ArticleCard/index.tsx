import { CSSProperties } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { MyImage, ToDate } from '@/components/common';
import { Article } from '@/entities/article';
import { HeartOutlined, MessageOutlined, EyeOutlined } from '@/components/icons';
import { Button } from '@/components/ui';
import s from './style.module.scss';

type ArticleCardProps = {
  article: Article;
  style?: CSSProperties;
};

const ArticleCard = ({ article, style }: ArticleCardProps) => (
  <article
    className={`group flex rounded-sm bg-white p-4 dark:bg-white--dark ${s.card}`}
    style={style}
  >
    <MyImage
      alt='article-cover'
      width={286}
      height={200}
      objectFit='cover'
      src={article.cover}
      className='min-w-[286px]'
      imgClassName='opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100'
      onClick={() => router.push(`/article/${article.id}`)}
    />
    <div className='ml-4 flex flex-grow flex-col items-start justify-between'>
      <header className='mt-1 mb-1'>
        <span className='block text-xs text-gray-2 dark:text-gray-2--dark'>
          <ToDate date={article.createAt} />
        </span>

        <h3
          className='cursor-pointer tracking-widest text-dark-2 transition-colors duration-500 hover:text-gray-3 dark:text-gray-2--dark'
          onClick={() => router.push(`/article/${article.id}`)}
        >
          {article.title}
        </h3>
      </header>

      <div className='mt-2 mb-2 min-h-[48px] flex-grow overflow-hidden text-ellipsis text-sm tracking-wider'>
        {article.description}
      </div>

      <Button type='ghost' className='mb-3 py-2 px-6 tracking-widest'>
        <Link href={`/article/${article.id}`}>READ MORE</Link>
      </Button>

      <div className='mb-1 flex items-end space-x-3 text-xxs text-gray-1 dark:text-gray-1--dark'>
        <span>
          <HeartOutlined className='mr-1 text-xxs' />
          {article.liking}
        </span>
        <span>
          <EyeOutlined className='mr-1 text-xxs' />
          {article.reading}
        </span>
        <span>
          <MessageOutlined className='mr-1 text-xxs' />
          {article.commenting}
        </span>
      </div>
    </div>
  </article>
);

export default ArticleCard;
