import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllBlogPathsWithPath, getBlog, readBlog } from '@/api/blog';
import { getAllTags } from '@/api/tag';
import TableOfContent from '@/components/blog/TableOfContent';
import BlogHeader from '@/components/blog/BlogHeader';
import CommentView from '@/components/comment/CommentView';
import Layout from '@/components/common/Layout';
import MyImage from '@/components/common/MyImage';
import Container from '@/components/ui/Container';
import { COMMENT_VIEW_ELEMENT_ID } from '@/constants/anchor';
import { Blog, BlogDetailResponse } from '@/entities/blog';
import { PageProps } from '@/types/common';
import { CommentListSkeleton } from '@/components/comment/CommentSkeleton';
import BlogClient from '@/components/blog/BlogClient';
import { getBlogDetailRoute } from '@/utils/url';
import BlogContent from '@/components/blog/BlogContent';

export const dynamicParams = true;

export const revalidate = 3600;

export async function generateStaticParams() {
  const paths = await getAllBlogPathsWithPath();
  return paths;
}

const fetchData = async (path?: string) => {
  if (!path) {
    return notFound();
  }
  let blog: BlogDetailResponse;
  try {
    blog = await getBlog(path);
  } catch (err) {
    notFound();
  }
  const tags = await getAllTags();

  readBlog(blog.id);
  const mdxSource = await serialize(blog.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    blog,
    tags,
    source: mdxSource,
  };
};

const BlogPage = async ({ params }: PageProps<{ path?: string }>) => {
  const { blog, source } = await fetchData(params.path);

  const renderPagination = (pageBlog: Blog | null, title: string) => (
    <p className={!pageBlog ? 'text-gray-400' : ''}>
      <span className='font-bold'>{title}: </span>
      {pageBlog ? (
        <Link href={getBlogDetailRoute(pageBlog.path)}>
          <span className='cursor-pointer text-primary transition-all hover:text-primary-hover hover:underline'>
            {pageBlog.title}
          </span>
        </Link>
      ) : (
        <span>无</span>
      )}
    </p>
  );

  return (
    <Layout footerTheme='reverse'>
      <BlogClient blog={blog} />

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
            <BlogContent source={source} />

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
        <Suspense fallback={<CommentListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <CommentView blogId={blog.id} />
        </Suspense>
      </div>
    </Layout>
  );
};

export default BlogPage;
