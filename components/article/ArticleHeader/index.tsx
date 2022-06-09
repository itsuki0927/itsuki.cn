import Link from 'next/link';
import { MyImage, ToDate } from '@/components/common';
import { ArticleDetailResponse } from '@/entities/article';

interface ArticleHeaderProps {
  article: ArticleDetailResponse;
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => (
  <div className='container flex flex-col justify-between px-4 sm:flex-row sm:items-center'>
    <header className='justify-between space-y-2'>
      <h1 className='text-3xl font-medium'>{article.title}</h1>

      <ul className='flex flex-col text-sm text-gray-3 sm:flex-row sm:items-center sm:space-x-1'>
        <li>
          <ToDate date={article.createAt} to='YMDm' /> /{' '}
          <Link href='/about'>
            <a className='transition-colors hover:text-primary'>itsuki0927</a>
          </Link>{' '}
          /
        </li>

        <li className='text-primary'>
          {article.reading}人浏览 • {article.commenting}条评论 • {article.liking}人喜欢
        </li>
      </ul>

      <div>
        <span className='rounded-sm bg-primary-light px-2 py-1 text-sm text-primary'>
          最后更新于
          <ToDate date={article.updateAt} to='YMDm' />
        </span>
      </div>
    </header>

    <div className='mt-4 max-w-sm align-middle'>
      <MyImage
        src={article.cover}
        width={661}
        height={300}
        objectFit='cover'
        alt='article-header-cover'
        className='cursor-pointer'
      />
    </div>
  </div>
);

export default ArticleHeader;
