import { useRouter } from 'next/router';
import { Article } from '@/entities/article';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';
import { getArticleDetailRoute } from '@/utils/url';

interface ArticlePaginationProps {
  prevArticle: Article | null;
  nextArticle: Article | null;
}

const ArticlePagination = ({ prevArticle, nextArticle }: ArticlePaginationProps) => {
  const router = useRouter();
  return (
    <div className='flex justify-between'>
      <div className='w-1/2 border-r border-solid border-white-2 bg-white py-4 px-6  '>
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
            className='cursor-pointer text-sm text-gray-1 transition-colors duration-500 hover:text-dark-2 '
          >
            {prevArticle.title}
          </h3>
        ) : (
          <h3 className='text-sm text-gray-1'>无</h3>
        )}
      </div>

      <div className='w-1/2 bg-white py-4 px-6 text-right '>
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
            className='cursor-pointer text-right text-sm text-gray-1 transition-colors duration-500 hover:text-dark-2 '
          >
            {nextArticle.title}
          </h3>
        ) : (
          <h3 className='text-sm text-gray-1 '>无</h3>
        )}
      </div>
    </div>
  );
};

export default ArticlePagination;
