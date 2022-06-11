import Link from 'next/link';
import { MyImage, ToDate } from '@/components/common';
import { Widget } from '@/components/ui';
import { Article } from '@/entities/article';
import { getArticleDetailRoute } from '@/utils/url';

interface RelateArticlesProps {
  relateArticles: Article[];
}

const RelateArticles = ({ relateArticles }: RelateArticlesProps) => (
  <Widget>
    <Widget.Header>你可能喜欢</Widget.Header>
    <div className='flex justify-between space-x-4'>
      {relateArticles.map(article => (
        <div key={article.id} className='w-1/3 flex-grow'>
          <Link href={getArticleDetailRoute(article.id)}>
            <MyImage
              src={article.cover}
              width={210}
              height={158}
              layout='responsive'
              className='cursor-pointer'
              alt='relate-article-cover'
              objectFit='cover'
            />
          </Link>
          <h2 className='my-2 cursor-pointer px-3 text-center text-dark-2 transition-colors duration-500 line-clamp-1 hover:text-primary  '>
            <Link href={getArticleDetailRoute(article.id)}>{article.title}</Link>
          </h2>
          <span className='block text-center text-sm tracking-wider text-gray-2'>
            <ToDate date={article.createAt} to='YMD' />
          </span>
        </div>
      ))}
    </div>
  </Widget>
);

export const RelateArticleSkeleton = () => (
  <div className='mx-auto w-full rounded-sm bg-white p-4'>
    <div className='animate-pulse'>
      <div className='my-2 mx-auto h-3 w-40 rounded-sm bg-skeleton' />

      <div className='flex space-x-4'>
        <div className='flex flex-1 flex-col py-1'>
          <div className='my-2 h-32 rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-5 w-[90%] rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-4 w-[70%] rounded-sm bg-skeleton' />
        </div>

        <div className='flex flex-1 flex-col py-1'>
          <div className='my-2 h-32 rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-5 w-[90%] rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-4 w-[70%] rounded-sm bg-skeleton' />
        </div>

        <div className='flex flex-1 flex-col py-1'>
          <div className='my-2 h-32 rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-5 w-[90%] rounded-sm bg-skeleton' />
          <div className='my-2 mx-auto h-4 w-[70%] rounded-sm bg-skeleton' />
        </div>
      </div>
    </div>
  </div>
);

export default RelateArticles;
