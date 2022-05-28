import { useRouter } from 'next/router';
import { MyImage, ToDate, TagList } from '@/components/common';
import { TimeOutlined, EyeOutlined } from '@/components/icons';
import { ArticleDetailResponse } from '@/entities/article';
import { UIParams } from '@/components/ui/context';

interface ArticleHeaderProps {
  article: ArticleDetailResponse;
  openPopup: (params?: UIParams) => void;
}

const ArticleHeader = ({ article, openPopup }: ArticleHeaderProps) => {
  const router = useRouter();

  return (
    <div className='text-center'>
      <header className='mt-4 mb-6 space-y-2'>
        <h1 className='text-3xl'>{article.title}</h1>

        <TagList tags={article.tags} />

        <ul className='flex items-center justify-center space-x-2 text-sm text-gray-1 '>
          <li className='flex items-center'>
            <MyImage
              circle
              className='mr-1 inline-block'
              src='https://static.itsuki.cn/avatar1.jpg'
              width={24}
              height={24}
            />
            <span
              role='button'
              tabIndex={0}
              onClick={() => router.push('/about')}
              className='transition-colors hover:text-primary'
            >
              itsuki0927
            </span>
          </li>
          <li>•</li>
          <li>
            <TimeOutlined className='mr-1 align-baseline text-sm' />
            <ToDate date={article.createAt} to='YMDm' />
          </li>
          <li>•</li>
          <li className='text-sm'>
            <EyeOutlined className='mr-1 align-baseline text-sm' />
            {article.reading}人浏览
          </li>
        </ul>
      </header>

      <MyImage
        onClick={() => {
          openPopup({ src: article.cover });
        }}
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
