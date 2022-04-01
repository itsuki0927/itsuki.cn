import classNames from 'classnames';
import { EyeFilled, HeartFilled, HeartOutlined, MessageFilled } from '@/components/icons';
import { Article } from '@/entities/article';
import useLikeArticle from '@/hooks/article/useLikeArticle';

interface ArticleCounterProps {
  article: Article;
}

const ArticleCounter = ({ article }: ArticleCounterProps) => {
  const { isLike, mutation } = useLikeArticle(article.id);

  return (
    <div className='flex space-x-6'>
      <div key='reading' className='w-1/3 rounded-sm bg-white p-4'>
        <EyeFilled className='h-10 w-10 rounded-sm bg-blue-50 text-2xl leading-10 text-blue-500' />
        <span className='ml-4 text-sm'>
          <strong className='mr-1 text-lg text-blue-500'>{article.reading}</strong>
          人阅读
        </span>
      </div>
      <div key='commenting' className='w-1/3 rounded-sm bg-white p-4'>
        <MessageFilled className='h-10 w-10 rounded-sm bg-green-50 text-2xl leading-10 text-green-500' />
        <span className='ml-4 text-sm'>
          <strong className='mr-1 text-lg text-green-500'>{article.commenting}</strong>
          条评论
        </span>
      </div>
      <div
        tabIndex={0}
        role='button'
        key='liking'
        className={classNames('w-1/3 rounded-sm bg-white p-4', 'cursor-pointer', {
          'cursor-default': isLike,
        })}
        onClick={() => {
          if (isLike) return;
          mutation.mutate();
        }}
      >
        {isLike ? (
          <HeartFilled className='h-10 w-10 rounded-sm bg-red-50 text-2xl leading-10 text-red-500' />
        ) : (
          <HeartOutlined className='h-10 w-10 rounded-sm bg-red-50 text-2xl leading-10 text-red-500' />
        )}
        <span className='ml-4 text-sm'>
          <strong className='mr-1 text-lg text-red-500'>{article.liking}</strong>
          个喜欢
        </span>
      </div>
    </div>
  );
};

export default ArticleCounter;
