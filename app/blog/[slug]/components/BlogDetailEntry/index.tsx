import MdxContent from '@/components/common/MdxContent';
import splitPage from '@/utils/splitPage';
import { Suspense } from 'react';
import { Blog } from '@/types/blog';
import BlogTableOfContent from '../BlogTableOfContent';
import BlogHeader from '../BlogHeader';
import { IndexProvider } from '../PageSection/IndexProvider';
import BlogContentSkeleton from '../BlogContentRender/skeleton';
import BlogReactionsUI from '../BlogReactions/UI';

interface BlogDetailEntryProps {
  blog: Blog;
  slug: string;
}

const BlogDetailEntry = ({ blog, slug }: BlogDetailEntryProps) => {
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
        <BlogHeader blog={blog} />

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
          <BlogReactionsUI slug={slug} blog={blog} />
        </Suspense>
      </aside>
    </>
  );
};

export default BlogDetailEntry;
