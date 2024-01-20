import React from "react";
import BlogContentRender from "./components/BlogContentRender";
import { Metadata } from "next";
import getBlog from "@/libs/notion/getBlog";
import getAllBlogs from "@/libs/notion/getAllBlogs";
import { PageProps } from "@/types/common";
import BlogReactions from "./components/BlogReactions";
import { getBlogViews, getReactions } from "@/actions/blog";

type BlogPageProps = PageProps<{ slug: string }>;

export interface NotionResponse {
  recordMap: any;
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
  const ogImage = cover ? cover : `https://itsuki.cn/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt?.toLocaleString(),
      url: `https://itsuki.cn/blog/${params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const NotionPage = async ({ params }: BlogPageProps) => {
  const slug = params.slug;
  const blogRes = await getBlog(slug);
  const reactions = await getReactions(slug);
  const blogViews = await getBlogViews(slug);

  return (
    <div className="flex">
      <aside className="hidden w-[90px] shrink-0 lg:block">
        <div className="sticky top-2 flex justify-end pt-20">
          <BlogReactions
            id={params.slug}
            mood={blogRes.blog.mood}
            reactions={reactions}
          />
        </div>
      </aside>
      <div className="flex-1 container mx-auto">
        <BlogContentRender {...blogRes} blogViews={blogViews} />
      </div>
    </div>
  );
};

export default NotionPage;
