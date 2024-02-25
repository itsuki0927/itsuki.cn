import { getAllBlogs, getBlog } from '@/actions/blog';
import { BASE_URL } from '@/constants/app';
import { Blog } from '@/types/blog';
import { PageProps } from '@/types/common';
import getHeadings from '@/utils/getHeadings';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailEntry from './components/BlogDetailEntry';

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
  const { blog } = await fetchBlog(slug);

  return <BlogDetailEntry blog={blog} slug={slug} />;
};

export default BlogPage;
