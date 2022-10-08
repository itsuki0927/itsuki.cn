import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getAllBlogPathsWithPath, getBlog, readBlog } from '@/api/blog';
import { getBlackList } from '@/api/blacklist';
import { getAllTags } from '@/api/tag';
import { BlogSkeleton } from '@/components/blog';
import BlogAction from '@/components/blog/BlogAction';
import BlogAside from '@/components/blog/BlogAside';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogMeta from '@/components/blog/BlogMeta';
import RelateBlogs, { RelateBlogSkeleton } from '@/components/blog/RelateBlogs';
import {
  CommentFormSkeletion,
  CommentListSkeleton,
  CommentView,
} from '@/components/comment';
import { Layout, MyImage, ToDate } from '@/components/common';
import { createQueryClient } from '@/components/common/QueryClientContainer';
import { Container, MarkdownBlock } from '@/components/ui';
import { META } from '@/configs/app';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { GAEventCategories } from '@/constants/gtag';
import { blogKeys, blacklistKeys, tagKeys } from '@/constants/queryKeys';
import { TIMESTAMP } from '@/constants/value';
import { useBlog, useBlogs } from '@/hooks/blog';
import { gtag } from '@/utils/gtag';
import { getBlogDetailFullUrl, getTagRoute } from '@/utils/url';

export const getStaticPaths = async () => {
  const paths = await getAllBlogPathsWithPath();

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
  const { data } = useBlogs();
  const relateBlogs = data?.data.slice(0, 3) ?? [];

  useEffect(() => {
    if (blog) {
      readBlog(blog.id);
      gtag.event('blog_view', {
        category: GAEventCategories.Blog,
        label: blog?.title,
      });
    }
  }, [blog]);

  if (isFallback || isLoading || !blog)
    return (
      <Layout>
        <div className='container space-y-6'>
          <BlogSkeleton />
          <RelateBlogSkeleton />
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
        <div className='absolute -left-14 sm:h-full sm:max-w-xs'>
          <div className='sticky top-20 left-0'>
            <BlogAction blog={blog} />
          </div>
        </div>
        <div className='max-w-full sm:max-w-3xl'>
          <div className='relative rounded-sm'>
            {blog.cover && (
              <div className='mb-8 align-middle'>
                <MyImage
                  src={blog.cover}
                  width={1216}
                  height={516}
                  objectFit='cover'
                  alt='blog-header-cover'
                  className='cursor-pointer'
                  id='blogCover'
                />
              </div>
            )}
            <MarkdownBlock htmlContent={blog.htmlContent} />

            <BlogMeta blog={blog} />
          </div>
        </div>

        <div className='hidden sm:block sm:max-w-xs sm:flex-grow'>
          <ul className='space-y-2 bg-gray-50 p-6'>
            <p className='mb-4 font-medium text-primary'>基本信息</p>
            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>作者</span>

              <Link href='/about'>
                <span className='cursor-pointer text-sm transition-colors hover:text-primary'>
                  {blog.author}
                </span>
              </Link>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>标签</span>

              <div className='space-x-2'>
                {blog.tags.map(tag => (
                  <Link key={tag.path} href={getTagRoute(tag.path)}>
                    <span className='cursor-pointer text-sm transition-all hover:underline'>
                      {tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>发布时间</span>

              <span className='text-sm'>
                <ToDate date={blog.createAt} to='YMDm' />
              </span>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>最后修改</span>

              <span className='text-sm'>
                <ToDate date={blog.updateAt} to='YMDm' />
              </span>
            </li>
          </ul>
          <BlogAside blog={blog} />
        </div>
      </Container>

      <Container className='my-24 border-t border-dashed border-gray-300' />

      <RelateBlogs relateBlogs={relateBlogs} />

      <Container className='my-24' id={COMMENT_VIEW_ELEMENT_ID}>
        <h3 className='mb-6 text-2xl text-gray-900'>相关评论</h3>
        <CommentView blogId={blog.id} />
      </Container>
    </Layout>
  );
};

export default BlogPage;
