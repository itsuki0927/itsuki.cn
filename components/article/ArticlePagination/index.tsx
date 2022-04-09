import Link from 'next/link';
import { Article } from '@/entities/article';

interface ArticlePaginationProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
}

const ArticlePagination = ({ prevArticle, nextArticle }: ArticlePaginationProps) => (
  <div className='flex justify-between'>
    <div className='w-1/2 border-r border-solid border-white-2 bg-white py-4 px-6 dark:border-white-2--dark dark:bg-white--dark'>
      <span className='mb-2 text-sm tracking-wider'>上一篇</span>
      {prevArticle ? (
        <Link href={`/article/${prevArticle.id}`}>
          <h3 className='cursor-pointer text-xs text-gray-1 transition-colors duration-500 hover:text-dark-2 dark:text-gray-1--dark'>
            {prevArticle.title}
          </h3>
        </Link>
      ) : (
        <h3 className='text-xs text-gray-1 dark:text-gray-1--dark'>无</h3>
      )}
    </div>

    <div className='w-1/2 bg-white py-4 px-6 text-right dark:bg-white--dark'>
      <span className='mb-2 text-sm tracking-wider'>下一篇</span>
      {nextArticle ? (
        <Link href={`/article/${nextArticle.id}`}>
          <h3 className='cursor-pointer text-right text-xs text-gray-1 transition-colors duration-500 hover:text-dark-2 dark:text-gray-1--dark'>
            {nextArticle.title}
          </h3>
        </Link>
      ) : (
        <h3 className='text-xs text-gray-1 dark:text-gray-1--dark'>无</h3>
      )}
    </div>
  </div>
);

export default ArticlePagination;
