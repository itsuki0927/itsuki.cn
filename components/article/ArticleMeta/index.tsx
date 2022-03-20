import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Skeleton } from '@/components/ui';
import { WEB_URL } from '@/configs/app';
import { Article } from '@/entities/article';
import { ArticleTag } from '..';

interface ArticleMetaProps {
  article: Article;
}

type ChildrenProps = { children?: ReactNode };

const Meta = ({ children }: ChildrenProps) => <p className='leading-6 h-6'>{children}</p>;

const Label = ({ children }: ChildrenProps) => (
  <span className='inline-block w-20'>{children}</span>
);

const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const router = useRouter();

  if (!article) return <Skeleton />;
  const category = article.categories[0];

  return (
    <div className='space-y-3 bg-white p-4'>
      <Meta>
        本文于 {new Date(article.createAt).toLocaleDateString()} 发布于{' '}
        <Link href={`/category/${category?.path}`}>
          <span className='cursor-pointer text-gray-600 transition-colors hover:text-gray-900'>
            <strong>{category?.name}</strong>
          </span>
        </Link>
      </Meta>

      <Meta>
        <Label>相关标签: </Label>
        {article.tags.map(item => (
          <ArticleTag key={item.id} tag={item} className='mr-2' />
        ))}
      </Meta>

      <Meta>
        <Label>永久地址: </Label>
        <span className='underline'>{WEB_URL + router.asPath}</span>
      </Meta>

      <Meta>
        <Label>版权声明: </Label>
        <a
          className='no-underline hover:underline'
          href='https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh'
          target='_blank'
          rel='external nofollow noopener noreferrer'
        >
          自由转载 - 署名 - 非商业使用
        </a>
      </Meta>
    </div>
  );
};

export default ArticleMeta;
