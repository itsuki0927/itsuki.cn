import { BASE_URL } from '@/constants/app';
import getAllBlogs from '@/libs/notion/getAllBlogs';
import { PageProps } from '@/types/common';
import { Metadata } from 'next';
import { ExtendedRecordMap } from 'notion-types';
import { Suspense } from 'react';
import BlogContentRender from './components/BlogContentRender';
import BlogContentSkeleton from './components/BlogContentRender/skeleton';
import BlogReactionsUI from './components/BlogReactions/UI';
import BlogTableOfContent from './components/BlogTableOfContent';

export type BlogPageProps = PageProps<{ slug: string }>;

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

  return (
    <>
      <Suspense>
        <BlogTableOfContent slug={slug} />
      </Suspense>

      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<BlogContentSkeleton />}>
          <BlogContentRender slug={slug} />
        </Suspense>
      </div>

      <aside className="top-1/2 right-12 hidden -translate-y-1/2 p-6 text-zinc-400 sm:fixed sm:flex w-[90px]">
        <Suspense>
          <BlogReactionsUI slug={slug} />
        </Suspense>
      </aside>
    </>
  );
};

export default NotionPage;
