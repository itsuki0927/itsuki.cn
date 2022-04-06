import Link from 'next/link';
import { ArticleDetailResponse } from '@/entities/article';
import useLikeArticle from '@/hooks/article/useLikeArticle';
import FavoriteButton from '../FavoriteButton';

interface ArticleFooterProps {
  article: ArticleDetailResponse;
}

const ArticleFooter = ({ article }: ArticleFooterProps) => {
  const { isLike, mutation } = useLikeArticle(article.id);
  return (
    <div className='absolute left-0 right-0 bottom-0 flex h-12 items-center justify-between text-white'>
      <div className='h-full w-1/2 bg-[#2d2d2d] pl-10 leading-12 tracking-wider'>
        <span className='text-xs'>BY</span>
        <Link href='/about'>
          <span className='ml-1 cursor-pointer text-sm font-bold transition-colors duration-500 hover:text-[#b6b6b6]'>
            ITSUKI
          </span>
        </Link>
      </div>

      <div className='h-full w-1/2 bg-[#222] pr-10 leading-12'>
        <FavoriteButton
          isLike={isLike}
          onLike={() => {
            mutation.mutateAsync();
          }}
          liking={article.liking}
        />
      </div>
    </div>
  );
};

export default ArticleFooter;
