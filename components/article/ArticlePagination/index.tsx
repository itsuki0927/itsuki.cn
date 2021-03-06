import { useRouter } from 'next/router';
import { GAEventCategories } from '@/constants/gtag';
import { Article } from '@/entities/article';
import { gtag } from '@/utils/gtag';
import { getArticleDetailRoute } from '@/utils/url';

interface ArticlePaginationProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
}

const ArticlePagination = ({ prevArticle, nextArticle }: ArticlePaginationProps) => {
  const router = useRouter();
  return (
    <div className='flex justify-between border-b border-solid border-white-2'>
      <div className='w-1/2 border-r border-solid border-white-2 bg-white py-2 px-4 sm:py-4 sm:px-6'>
        <span className='mb-2'>上一篇</span>
        {prevArticle ? (
          <h3
            key='prev'
            onClick={() => {
              router.push(getArticleDetailRoute(prevArticle.id));
              gtag.event('prev_article', {
                category: GAEventCategories.Article,
              });
            }}
            className='cursor-pointer text-sm text-gray-2 transition-colors duration-500 line-clamp-1 hover:text-dark-2 '
          >
            {prevArticle.title}
          </h3>
        ) : (
          <h3 className='text-sm text-gray-2'>无</h3>
        )}
      </div>

      <div className='w-1/2 bg-white py-2 px-4 text-right sm:py-4 sm:px-6'>
        <span className='mb-2'>下一篇</span>
        {nextArticle ? (
          <h3
            key='next'
            onClick={() => {
              router.push(getArticleDetailRoute(nextArticle.id));
              gtag.event('next_article', {
                category: GAEventCategories.Article,
              });
            }}
            className='cursor-pointer text-right text-sm text-gray-2 transition-colors duration-500 line-clamp-1 hover:text-dark-2 '
          >
            {nextArticle.title}
          </h3>
        ) : (
          <h3 className='text-sm text-gray-2'>无</h3>
        )}
      </div>
    </div>
  );
};

export default ArticlePagination;
