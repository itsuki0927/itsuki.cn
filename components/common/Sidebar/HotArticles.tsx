import Link from 'next/link';
import Image from 'next/image';
import { Widget } from '@/components/ui';
import { Article } from '@/entities/article';
import { getArticleDetailUrl } from '@/utils/url';
import ToDate from '../ToDate';

interface HotArticlesProps {
  hotArticles: Article[];
}

const HotArticles = ({ hotArticles }: HotArticlesProps) => (
  <Widget>
    <Widget.Header>最佳歌手</Widget.Header>
    {hotArticles.slice(0, 6).map(article => (
      <div className='mb-4 flex rounded-sm' key={article.id}>
        <Image src={article.cover} objectFit='cover' width={94} height={68} />
        <div className='ml-4 flex-grow py-1'>
          <Link href={getArticleDetailUrl(article.id)}>
            <h4 className='flex-1 cursor-pointer align-middle text-sm tracking-wider text-[#2d2d2d] transition-colors duration-500 hover:text-[#777]'>
              {article.title}
            </h4>
          </Link>
          <span className='text-xs text-[#b6b6b6]'>
            <ToDate date={article.createAt} to='YMD' />
          </span>
        </div>
      </div>
    ))}
  </Widget>
);

export default HotArticles;
