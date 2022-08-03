import { useRouter } from 'next/router';
import { ExternalLink, ToDate } from '@/components/common';
import { WEB_URL } from '@/configs/app';
import { ArticleDetailResponse } from '@/entities/article';

interface ArticleMetaProps {
  article: ArticleDetailResponse;
}

const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const router = useRouter();
  return (
    <div className='my-4 flex flex-col space-y-3 text-sm text-gray-2'>
      <span className='w-max rounded-sm text-sm'>
        <span>最后更新: </span>
        <ToDate date={article.updateAt} to='YMDm' />
      </span>

      <div>
        <span>永久地址: </span>
        <span className='underline'>
          {WEB_URL + router.pathname.replace('[id]', `${article.id}`)}
        </span>
      </div>

      <div>
        <span>版权声明: </span>
        <ExternalLink
          className='no-underline transition-colors hover:text-basic hover:underline'
          href='https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh'
        >
          自由转载 - 署名 - 非商业使用
        </ExternalLink>
      </div>
    </div>
  );
};

export default ArticleMeta;
