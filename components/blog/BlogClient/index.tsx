'use client';

import { useEffect } from 'react';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { META } from '@/configs/app';
import { BlogDetailResponse } from '@/entities/blog';
import { getBlogDetailFullUrl } from '@/utils/url';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';

interface BlogClientProps {
  blog: BlogDetailResponse;
}

const BlogClient = ({ blog }: BlogClientProps) => {
  useEffect(() => {
    gtag.event('blog_view', {
      category: GAEventCategories.Blog,
      label: blog?.title,
    });
  }, [blog]);

  return (
    <>
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
    </>
  );
};

export default BlogClient;
