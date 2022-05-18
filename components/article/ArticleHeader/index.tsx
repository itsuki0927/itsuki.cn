import { ao } from '@/constants/article/origin';
import { MyImage, ToDate, TagList } from '@/components/common';
import { EditOutlined, TimeOutlined, EyeOutlined } from '@/components/icons';
import { ArticleDetailResponse } from '@/entities/article';
import { UIParams } from '@/components/ui/context';

interface ArticleHeaderProps {
  article: ArticleDetailResponse;
  openPopup: (params?: UIParams) => void;
}

const ArticleHeader = ({ article, openPopup }: ArticleHeaderProps) => {
  const origin = ao(article.origin);
  return (
    <div className='text-center'>
      <header className='mt-4 mb-6 space-y-2'>
        <h1 className='text-3xl tracking-widest'>{article.title}</h1>

        <TagList tags={article.tags} />

        <div className='space-x-2 text-xs tracking-wider text-gray-1 '>
          <span>
            <TimeOutlined className='mr-1 align-baseline text-xs' />
            发布于 <ToDate date={article.createAt} to='YMDm' />
          </span>

          <span>
            <EyeOutlined className='mr-1 align-baseline text-xs' />
            {article.reading}人阅读
          </span>

          <span>
            <EditOutlined className='mr-1 align-baseline text-xs' />
            {origin.name}
          </span>
        </div>
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
