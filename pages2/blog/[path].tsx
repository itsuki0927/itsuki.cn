import Link from 'next/link';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getAllBlogPathsWithPath, getBlog, readBlog } from '@/api/blog';
import { getBlackList } from '@/api/blacklist';
import { getAllTags } from '@/api/tag';
import { TableOfContent, BlogSkeleton } from '@/components/blog';
import BlogHeader from '@/components/blog/BlogHeader';
import {
  CommentFormSkeletion,
  CommentListSkeleton,
  CommentView,
} from '@/components/comment';
import { Layout, MyImage } from '@/components/common';
import { createQueryClient } from '@/components/common/QueryClientContainer';
import { Container, MarkdownBlock } from '@/components/ui';
import { META } from '@/configs/app';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GAEventCategories } from '@/constants/gtag';
import { blogKeys, blacklistKeys, tagKeys } from '@/constants/queryKeys';
import { TIMESTAMP } from '@/constants/value';
import { useBlog } from '@/hooks/blog';
import { gtag } from '@/utils/gtag';
import { getBlogDetailFullUrl } from '@/utils/url';
import { Blog } from '@/entities/blog';

export const getStaticPaths = async () => {
  const paths = await getAllBlogPathsWithPath();
  console.log('paths:', paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const path = String(params?.path);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const queryClient = createQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(blogKeys.detailByPath(path), () => getBlog(path)),
    queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags()),
    queryClient.prefetchQuery(blacklistKeys.list, () => getBlackList()),
  ]);

  return {
    props: {
      path,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: TIMESTAMP.MINIUTE / 1000,
  };
};

const BlogPage = ({ path }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: blog, isLoading } = useBlog(path);
  const { isFallback } = useRouter();

  useEffect(() => {
    if (blog) {
      readBlog(blog.id);
      gtag.event('blog_view', {
        category: GAEventCategories.Blog,
        label: blog?.title,
      });
    }
  }, [blog]);

  const renderPagination = (pageBlog: Blog | null, title: string) => (
    <p className={!pageBlog ? 'text-gray-400' : ''}>
      <span className='font-bold'>{title}: </span>
      {pageBlog ? (
        <Link href={pageBlog.path ?? ''}>
          <span className='cursor-pointer text-primary transition-all hover:text-primary-hover hover:underline'>
            {pageBlog.title}
          </span>
        </Link>
      ) : (
        <span>无</span>
      )}
    </p>
  );

  if (isFallback || isLoading || !blog)
    return (
      <Layout>
        <div className='container space-y-6'>
          <BlogSkeleton />
          <CommentFormSkeletion />
          <CommentListSkeleton />
        </div>
      </Layout>
    );
  return (
    <Layout footerTheme='reverse'>
      <NextSeo
        title={blog.title}
        description={blog.description}
        additionalMetaTags={[
          { name: 'keywords', content: blog.keywords },
          {
            name: 'cover',
            content: blog.cover,
          },
        ]}
        openGraph={{
          title: blog.title,
          description: blog.description,
          url: getBlogDetailFullUrl(blog.path),
          type: 'blog',
          article: {
            publishedTime: blog.createAt.toString(),
            modifiedTime: blog.updateAt.toString(),
            expirationTime: blog.updateAt.toString(),
            authors: [META.url],
            tags: blog.tags.map(v => v.name),
          },
          images: [
            {
              url: blog.cover,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={getBlogDetailFullUrl(blog.path)}
        title={blog.title}
        images={[blog.cover]}
        datePublished={blog.createAt.toString()}
        dateModified={blog.updateAt.toString()}
        authorName={[{ name: blog.author, url: META.url }]}
        description={blog.description}
        publisherName={blog.title}
      />

      <BlogHeader blog={blog} />

      <Container className='relative mt-24 flex flex-row justify-between'>
        <div className='mx-auto max-w-full sm:max-w-4xl'>
          <div className='relative rounded-sm'>
            {blog.cover && (
              <div className='mb-8 align-middle'>
                <MyImage
                  src={blog.cover}
                  width={1216}
                  height={516}
                  alt='blog-header-cover'
                  className='cursor-pointer'
                  id='blogCover'
                />
              </div>
            )}
            <MarkdownBlock htmlContent={blog.htmlContent} />

            <TableOfContent blog={blog} />
          </div>
        </div>
      </Container>

      <div className='my-4 mx-auto space-y-2 sm:max-w-4xl'>
        {renderPagination(blog.nextBlog, '下一篇')}
        {renderPagination(blog.prevBlog, '上一篇')}
      </div>

      <Container className='my-24 border-t border-dashed border-gray-300 sm:max-w-4xl' />

      <div className='my-24 mx-auto sm:max-w-4xl' id={COMMENT_VIEW_ELEMENT_ID}>
        <CommentView blogId={blog.id} />
      </div>
    </Layout>
  );
};

export default BlogPage;
