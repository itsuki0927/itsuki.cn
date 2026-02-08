import BlogDetailEntry from '../../blog/[slug]/components/BlogDetailEntry';
import { ENV } from '../../../constants/env';
import { PageProps } from '../../../types/common';
import getHeadings from '../../../utils/getHeadings';
import { notFound } from 'next/navigation';
import React from 'react';
import { getDraftBlog } from '../action';
import splitPage from '../../../utils/splitPage';

export type PreviewBlogPageProps = PageProps<{ slug: string }>;

const fetchBlog = async (slug: string) => {
  try {
    const blog = (await getDraftBlog(slug)) as any;
    if (!blog) {
      return notFound();
    }

    const headings = getHeadings(blog.content ?? '');

    return { headings, blog };
  } catch (err) {
    return notFound();
  }
};

const PreviewBlogPage = async ({ params }: PreviewBlogPageProps) => {
  if (ENV.isProd) {
    return null;
  }
  const slug = params.slug;
  if (!slug) {
    notFound();
  }
  const { blog, headings } = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  const { content, length: numSections } = splitPage(blog.content);

  return React.createElement(BlogDetailEntry, {
    blog: { ...blog, content },
    slug,
    headings,
    numSections,
  });
};

export default PreviewBlogPage;
