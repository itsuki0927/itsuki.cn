import Image from 'next/image';
import { ao } from '@/constants/article/origin';
import { ArticleDetailResponse } from '@/entities/article';
import { ToDate } from '@/components/common';
import { EditOutlined, TimeOutlined, EyeOutlined } from '@/components/icons';

interface ArticleHeaderProps {
  article: ArticleDetailResponse;
}
const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  const origin = ao(article.origin);
  return (
    <div className='text-center'>
      <header className='mt-4 mb-6'>
        <h1 className='mt-1 tracking-widest'>{article.title}</h1>
        <div className='my-1 space-x-2 text-xs tracking-wider text-gray-1 dark:text-gray-1--dark'>
          <span>
            <TimeOutlined className='mr-1 align-baseline text-xs' />
            <ToDate date={article.createAt} to='YMDm' />
          </span>

          <span>
            <EyeOutlined className='mr-1 align-baseline text-xs' />
            {article.reading}人阅读
          </span>

          <span>
            <EditOutlined className='mr-1 align-baseline text-xs' />
            {origin.name}
          </span>
        </div>
      </header>

      <Image
        src={article.cover}
        width={661}
        height={300}
        objectFit='cover'
        alt='article-header-cover'
      />
    </div>
  );
};

export default ArticleHeader;
