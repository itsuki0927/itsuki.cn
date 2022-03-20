import Image from 'next/image';
import router from 'next/router';
import {
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  TimeOutlined,
} from '@/components/icons';
import { Article } from '@/entities/article';
import { getDateString } from '@/utils/date';
import imageTransformer from '@/utils/image';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => (
  <div
    role='article'
    onClick={() => router.push(`/article/${article.id}`)}
    className='cursor group flex cursor-pointer rounded-sm bg-white p-4'
  >
    <Image
      alt='article-cover'
      width={180}
      height={135}
      objectFit='cover'
      src={article.cover}
      className='opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100'
      loader={imageTransformer}
    />
    <div className='ml-3 flex grow flex-col justify-between'>
      <p className='mb-0 cursor-pointer text-lg transition-all hover:text-gray-900 hover:underline'>
        {article.title}
      </p>
      <p className='mb-0 grow text-gray-500'>{article.description}</p>

      <div className='mb-1 flex items-center justify-between text-sm text-gray-400'>
        <span key='time'>
          <TimeOutlined className='mr-1' />
          {getDateString(article.createAt)}
        </span>
        <span key='reading'>
          <EyeOutlined className='mr-1' />
          {article.reading}
        </span>
        <span key='commenting'>
          <MessageOutlined className='mr-1' />
          {article.commenting}
        </span>
        <span key='liking'>
          <HeartOutlined className='mr-1' />
          {article.liking}
        </span>
      </div>
    </div>
  </div>
);

export default ArticleCard;
