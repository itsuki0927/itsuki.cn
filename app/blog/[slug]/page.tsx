import { serialize } from 'next-mdx-remote/serialize';
import { getAllBlogs, getBlog } from '@/actions/blog';
import { BASE_URL } from '@/constants/app';
import { Blog } from '@/types/blog';
import { PageProps } from '@/types/common';
import getHeadings from '@/utils/getHeadings';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailEntry from './components/BlogDetailEntry';
import splitPage from '@/utils/splitPage';

export type BlogPageProps = PageProps<{ slug: string }>;

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const blogs = (await getAllBlogs()) || [];
  const blog = blogs.find((blog) => blog.slug === slug);
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
      url: `${BASE_URL}/blog/${slug}`,
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
  const { content, length: numSections } = splitPage(blog.content, blog.id);

  return { headings, blog: { ...blog, content }, numSections };
};

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  const { blog, numSections } = await fetchBlog(slug);

  return <BlogDetailEntry blog={blog} slug={slug} numSections={numSections} />;
};

export default BlogPage;
