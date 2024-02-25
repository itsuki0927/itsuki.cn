import { getAllBlogs, getBlog } from '@/actions/blog';
import MdxContent from '@/components/common/MdxContent';
import { BASE_URL } from '@/constants/app';
import { Blog } from '@/types/blog';
import { PageProps } from '@/types/common';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import BlogContentSkeleton from './components/BlogContentRender/skeleton';
import BlogHeader from './components/BlogHeader';
import BlogReactionsUI from './components/BlogReactions/UI';
import BlogTableOfContent from './components/BlogTableOfContent';
import splitPage from '@/utils/splitPage';
import getHeadings from '@/utils/getHeadings';
import { IndexProvider } from './components/PageSection/IndexProvider';

export type BlogPageProps = PageProps<{ slug: string }>;

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata | undefined> {
  const blogs = (await getAllBlogs()) || [];
  const blog = blogs.find((blog) => blog.slug === params.slug);
  if (!blog) {
    return;
  }

  const { title, createdAt, description, cover } = blog;
  const ogImage = cover ? cover : `${BASE_URL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: createdAt?.toLocaleString(),
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
  console.log('[fetch]: getAllBlogs');
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

const fetchBlog = async (path: string) => {
  let blog: Blog | null | undefined;

  try {
    blog = await getBlog(path);
    if (blog === null) {
      return notFound();
    }
  } catch (err) {
    return notFound();
  }

  const headings = getHeadings(blog.content);

  return { headings, blog };
};

const BlogPage = async ({ params }: BlogPageProps) => {
  const slug = params.slug;
  if (!slug) {
    notFound();
  }
  const { blog, headings } = await fetchBlog(slug);
  const { content, length: numSections } = splitPage(blog.content, blog.id);

  // const jsonLd: WithContext<BlogPosting> = {
  //   '@context': 'https://schema.org',
  //   '@type': 'BlogPosting',
  //   url: `https://itsuki.cn/blog/${blog?.slug}`,
  //   headline: blog?.title,
  //   description: blog?.description,
  //   dateCreated: blog?.createdAt?.toString(),
  //   dateModified: blog?.updatedAt?.toString(),
  //   author: [
  //     {
  //       '@type': 'Person',
  //       name: META.author,
  //       url: META.url,
  //     },
  //   ],
  // };

  return (
    <>
      <Suspense>
        <BlogTableOfContent slug={slug} />
      </Suspense>

      <div className="max-w-4xl mx-auto bg-white text-zinc-800 p-4 rounded-xl">
        <BlogHeader slug={slug} />

        <IndexProvider numSections={numSections}>
          <Suspense fallback={<BlogContentSkeleton />}>
            <MdxContent
              options={{
                scope: { blog },
              }}
              source={content}
            />
          </Suspense>
        </IndexProvider>
      </div>

      <aside className="top-1/2 right-12 hidden -translate-y-1/2 p-6 text-zinc-400 sm:fixed sm:flex w-[90px]">
        <Suspense>
          <BlogReactionsUI slug={slug} />
        </Suspense>
      </aside>
    </>
  );
};

export default BlogPage;
