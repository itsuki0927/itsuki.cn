import { getBlogViews } from '@/actions/blog';
import { BASE_URL } from '@/constants/app';
import getAllBlogs from '@/libs/notion/getAllBlogs';
import getBlog from '@/libs/notion/getBlog';
import getRootPage from '@/libs/notion/getRootPage';
import { PageProps } from '@/types/common';
import { Metadata } from 'next';
import { ExtendedRecordMap } from 'notion-types';
import { Suspense } from 'react';
import BlogContentRender from './components/BlogContentRender';
import BlogReactionsUI from './components/BlogReactions/UI';
import BlogTableOfContent from './components/BlogTableOfContent';

type BlogPageProps = PageProps<{ slug: string }>;

export interface NotionResponse {
  recordMap: ExtendedRecordMap;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata | undefined> {
  const blogs = (await getAllBlogs()) || [];
  const blog = blogs.find((blog) => blog.slug === params.slug);
  if (!blog) {
    return;
  }

  const { title, publishedAt, description, cover } = blog;
  const ogImage = cover ? cover : `${BASE_URL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: publishedAt?.toLocaleString(),
      url: `${BASE_URL}/blog/${params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

const NotionPage = async ({ params }: BlogPageProps) => {
  const slug = params.slug;
  const blogRes = await getBlog(slug);
  const blogViews = await getBlogViews(slug);
  const { block: allBlocks } = await getRootPage();

  return (
    <>
      <BlogTableOfContent blocks={allBlocks} {...blogRes} />

      <div className="max-w-4xl mx-auto">
        <BlogContentRender {...blogRes} blogViews={blogViews} />
      </div>

      <aside className="top-1/2 right-12 hidden -translate-y-1/2 p-6 text-gray-400 sm:fixed sm:flex w-[90px]">
        <Suspense>
          <BlogReactionsUI slug={slug} mood={blogRes.blog.mood} />
        </Suspense>
      </aside>
    </>
  );
};

export default NotionPage;
