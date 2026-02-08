import { getAllBlogs, getBlog } from '../../../actions/blog';
import { BASE_URL } from '../../../constants/app';
import { PageProps } from '../../../types/common';
import getHeadings from '../../../utils/getHeadings';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import BlogDetailEntry from './components/BlogDetailEntry';
import splitPage from '../../../utils/splitPage';

export type BlogPageProps = PageProps<{ slug: string }>;

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata | undefined> {
  const { slug } = params;
  const blog = await getBlog(slug);
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
  return blogs.map((blog: any) => ({ slug: blog.slug }));
}

const fetchBlog = async (path: string) => {
  try {
    const blog = await getBlog(path);
    if (!blog) {
      return notFound();
    }

    const headings = getHeadings(blog.content);
    const { content, length: numSections } = splitPage(blog.content);

    return { headings, blog: { ...blog, content }, numSections };
  } catch (err) {
    return notFound();
  }
};

const BlogPage = async ({ params }: BlogPageProps) => {
  const { slug } = params;
  if (!slug) {
    notFound();
  }
  const { blog, headings, numSections } = await fetchBlog(slug);

  return React.createElement(BlogDetailEntry, {
    blog,
    slug,
    headings,
    numSections,
  });
};

export default BlogPage;
