import { VERCEL_ENV } from '@/constants/env';
import { kvKeys } from '@/constants/kv';
import buildUrl from '@/utils/buildUrl';
import BlogReactions from './index';
import { Blog } from '@/types/blog';

const genMockReactions = () =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));

const getReactions = async (id: string): Promise<number[]> => {
  try {
    if (VERCEL_ENV === 'production') {
      const res = await fetch(buildUrl(`/api/reactions?id=${id}`), {
        next: {
          tags: [kvKeys.blogReactions(id)],
        },
      });
      const data = await res.json();
      return data;
    } else {
      return genMockReactions();
    }
  } catch (error) {
    console.error(error);
  }
  return genMockReactions();
};

interface BlogReactionsProps {
  slug: string;
  blog: Blog;
}

const BlogReactionsUI = async ({ slug, blog }: BlogReactionsProps) => {
  const reactions = await getReactions(slug);

  if (!blog) {
    return null;
  }

  return <BlogReactions id={blog.id} mood={blog?.mood} reactions={reactions} />;
};

export default BlogReactionsUI;
