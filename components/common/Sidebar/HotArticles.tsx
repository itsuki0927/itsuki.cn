import Link from 'next/link';
import { Widget } from '@/components/ui';
import { Article } from '@/entities/article';
import { getArticleDetailUrl } from '@/utils/url';
import ToDate from '../ToDate';
import { MyImage } from '..';

interface HotArticlesProps {
  hotArticles: Article[];
}

const HotArticles = ({ hotArticles }: HotArticlesProps) => (
  <Widget>
    <Widget.Header>最佳歌手</Widget.Header>
    {hotArticles.slice(0, 6).map(article => (
      <div className='mb-4 flex items-center rounded-sm' key={article.id}>
        <MyImage
          src={article.cover}
          objectFit='cover'
          width={94}
          height={68}
          alt='hot-article-cover'
          className='min-w-[94px]'
        />
        <div className='ml-4'>
          <h4 className='cursor-pointer text-sm tracking-wider text-dark-2 transition-colors duration-500 line-clamp-1 hover:text-primary dark:text-dark-2--dark'>
            <Link href={getArticleDetailUrl(article.id)}>{article.title}</Link>
          </h4>
          <span className='text-xs text-gray-1 dark:text-gray-1--dark'>
            <ToDate date={article.createAt} to='YMD' />
          </span>
        </div>
      </div>
    ))}
  </Widget>
);

export default HotArticles;
