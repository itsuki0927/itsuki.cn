import { useRouter } from 'next/router';
import Image from 'next/image';
import { ToDate } from '@/components/common';
import { Widget } from '@/components/ui';
import { Article } from '@/entities/article';

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
              src={article.cover}
              width={210}
              height={158}
              onClick={() => router.push(`/article/${article.id}`)}
            />
            <h2
              className='cursor-pointer text-center text-sm tracking-widest text-[#2d2d2d] transition-colors duration-500 hover:text-[#777]'
              onClick={() => router.push(`/article/${article.id}`)}
            >
              {article.title}
            </h2>
            <span className='my-1 block text-center text-xs tracking-wider text-[#b6b6b6]'>
              <ToDate date={article.createAt} to='YMD' />
            </span>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default RelateArticles;
