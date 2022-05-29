import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Affix, Container, Widget } from '@/components/ui';
import { useArticle } from '@/hooks/article';
import { ArticleHeading } from '@/hooks/article/useArticle';
import scrollTo from '@/utils/scrollTo';

const HeadingArchor = ({ heading }: { heading: ArticleHeading }) => (
  <li
    className={classNames(
      `ml-${
        (heading.level - 1) * 4
      } block cursor-pointer transition-colors line-clamp-1 hover:text-primary`
    )}
    onClick={() => {
      scrollTo(`#${heading.id}`, 300, {
        offset: -100,
      });
    }}
  >
    <span className='mr-1 text-gray-2'>
      H<small className='text-xs'>{heading.level}</small>
    </span>
    <span className='text-sm '>{heading.text}</span>
  </li>
);

const ArticleNavSkeleton = () => (
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

const ArticleNav = () => {
  const router = useRouter();
  const articleId = Number(router.query.id);
  const { data, isLoading, isFetching } = useArticle(articleId);

  if (Number.isNaN(articleId)) return <div>Error</div>;
  if (isFetching || isLoading) return <ArticleNavSkeleton />;

  return (
    <Affix top={104}>
      <Widget>
        <Widget.Header>文章目录</Widget.Header>
        <ul className='max-h-96 space-y-1 overflow-y-scroll p-2'>
          {data?.headings.map(item => (
            <HeadingArchor heading={item} key={item.id} />
          ))}
        </ul>
      </Widget>
    </Affix>
  );
};

export default ArticleNav;
