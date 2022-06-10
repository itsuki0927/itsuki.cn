import classNames from 'classnames';
import { Container, Widget } from '@/components/ui';
import { useArticle } from '@/hooks/article';
import { ArticleHeading } from '@/hooks/article/useArticle';
import scrollTo from '@/utils/scrollTo';
import { ArticleDetailResponse } from '@/entities/article';

const getHeadingArchorIndent = (level: number) => `ml-${(level - 1) * 4}`;

const HeadingArchor = ({ heading }: { heading: ArticleHeading }) => (
  <li
    className={classNames(
      getHeadingArchorIndent(heading.level),
      'block cursor-pointer transition-colors line-clamp-1 hover:text-primary'
    )}
    onClick={() => {
      scrollTo(`#${heading.id}`, 300, {
        offset: -100,
      });
    }}
  >
    <span className='text-sm'>{heading.text}</span>
  </li>
);

const ArticleAsideSkeleton = () => (
  <Container className='animate-pulse'>
    <div className='mx-auto mb-4 h-5 max-w-[40%] rounded-sm bg-skeleton' />
    <div className='space-y-2'>
      <div className='h-4 max-w-[80%] rounded-sm bg-skeleton' />
      <div className='ml-8 h-4 max-w-[50%] rounded-sm bg-skeleton' />
      <div className='h-4 max-w-[40%] rounded-sm bg-skeleton' />
      <div className='ml-8 h-4 max-w-[50%] rounded-sm bg-skeleton' />
      <div className='h-4 max-w-[40%] rounded-sm bg-skeleton' />
      <div className='h-4 max-w-[80%] rounded-sm bg-skeleton' />
    </div>
  </Container>
);

interface ArticleAsideProps {
  article: ArticleDetailResponse;
}

const ArticleAside = ({ article }: ArticleAsideProps) => {
  const articleId = article.id;
  const { data, isLoading, isFetching } = useArticle(articleId);

  if (Number.isNaN(articleId)) return <div>Error</div>;
  if (isFetching || isLoading) return <ArticleAsideSkeleton />;

  return (
    <Widget className='sticky top-16'>
      <ul className='max-h-[calc(100vh-148px)] space-y-1 overflow-y-scroll'>
        <Widget.Header>文章目录</Widget.Header>
        {data?.headings.map(item => (
          <HeadingArchor heading={item} key={item.id} />
        ))}
      </ul>
    </Widget>
  );
};

export default ArticleAside;
