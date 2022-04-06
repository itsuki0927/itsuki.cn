import Link from 'next/link';
import { Article } from '@/entities/article';

interface ArticlePaginationProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
}

const ArticlePagination = ({ prevArticle, nextArticle }: ArticlePaginationProps) => (
  <div className='flex justify-between'>
    <div className='w-1/2 border-r border-solid border-[#f2f2f2] bg-white py-4 px-6'>
      <span className='mb-2 text-sm tracking-wider'>上一篇</span>
      {prevArticle ? (
        <Link href={`/article/${prevArticle.id}`}>
          <h3 className='cursor-pointer text-xs text-[#b6b6b6] transition-colors duration-500 hover:text-[#2d2d2d]'>
            {prevArticle.title}
          </h3>
        </Link>
      ) : (
        <h3 className='text-xs text-[#b6b6b6]'>无</h3>
      )}
    </div>

    <div className='w-1/2 bg-white py-4 px-6 text-right'>
      <span className='mb-2 text-sm tracking-wider'>下一篇</span>
      {nextArticle ? (
        <Link href={`/article/${nextArticle.id}`}>
          <h3 className='cursor-pointer text-right text-xs text-[#b6b6b6] transition-colors duration-500 hover:text-[#2d2d2d]'>
            {nextArticle.title}
          </h3>
        </Link>
      ) : (
        <h3 className='text-xs text-[#b6b6b6]'>无</h3>
      )}
    </div>
  </div>
);

export default ArticlePagination;
