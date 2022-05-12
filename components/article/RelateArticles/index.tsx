import { useRouter } from 'next/router';
import Link from 'next/link';
import { MyImage, ToDate } from '@/components/common';
import { Widget } from '@/components/ui';
import { Article } from '@/entities/article';
import { getArticleDetailUrl } from '@/utils/url';

interface RelateArticlesProps {
  relateArticles: Article[];
}

const RelateArticles = ({ relateArticles }: RelateArticlesProps) => {
  const router = useRouter();
  return (
    <Widget>
      <Widget.Header> 看看这些? </Widget.Header>
      <div className='mb-2 flex justify-between'>
        {relateArticles.map(article => (
          <div key={article.id} className='max-w-[210px]'>
            <MyImage
              src={article.cover}
              width={210}
              height={158}
              onClick={() => router.push(getArticleDetailUrl(article.id))}
              alt='relate-article-cover'
              objectFit='cover'
            />
            <h2 className='my-2 cursor-pointer px-3 text-center text-sm tracking-widest text-dark-2 transition-colors duration-500 line-clamp-1 hover:text-primary dark:text-dark-2--dark dark:hover:text-gray-3--dark'>
              <Link href={getArticleDetailUrl(article.id)}>{article.title}</Link>
            </h2>
            <span className='block text-center text-xs tracking-wider text-gray-1 dark:text-gray-1--dark'>
              <ToDate date={article.createAt} to='YMD' />
            </span>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default RelateArticles;
