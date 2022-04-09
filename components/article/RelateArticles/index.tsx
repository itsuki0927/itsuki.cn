import { useRouter } from 'next/router';
import Image from 'next/image';
import { ToDate } from '@/components/common';
import { Widget } from '@/components/ui';
import { Article } from '@/entities/article';
import imageTransformer from '@/utils/image';

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
          <div key={article.id}>
            <Image
              loader={imageTransformer}
              src={article.cover}
              width={210}
              height={158}
              className='aspect-square'
              onClick={() => router.push(`/article/${article.id}`)}
              alt='relate-article-cover'
            />
            <h2
              className='cursor-pointer text-center text-sm tracking-widest text-dark-2 transition-colors duration-500 hover:text-gray-3 dark:text-dark-2--dark dark:hover:text-gray-3--dark'
              onClick={() => router.push(`/article/${article.id}`)}
            >
              {article.title}
            </h2>
            <span className='my-1 block text-center text-xs tracking-wider text-gray-1 dark:text-gray-1--dark'>
              <ToDate date={article.createAt} to='YMD' />
            </span>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default RelateArticles;
