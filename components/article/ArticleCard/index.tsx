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
    className='flex cursor bg-white p-4 group cursor-pointer rounded-sm'
  >
    <Image
      alt='article-cover'
      width={180}
      height={135}
      objectFit='cover'
      src={article.cover}
      className='opacity-90 transition-all group-hover:opacity-100 group-hover:scale-105'
      loader={imageTransformer}
    />
    <div className='grow flex ml-3 flex-col justify-between'>
      <p className='text-lg mb-0 cursor-pointer transition-all hover:underline hover:text-gray-900'>
        {article.title}
      </p>
      <p className='text-gray-500 mb-0 grow'>{article.description}</p>

      <div className='flex justify-between text-gray-400 items-center text-sm mb-1'>
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
