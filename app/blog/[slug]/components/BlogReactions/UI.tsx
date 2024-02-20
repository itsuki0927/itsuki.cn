import { VERCEL_ENV } from '@/constants/env';
import { kvKeys } from '@/constants/kv';
import buildUrl from '@/utils/buildUrl';
import BlogReactions from './index';
import { Blog } from '@/types/blog';

const genMockReactions = () =>
  Array.from({ length: 4 }, () => Math.floor(Math.random() * 50000));

interface BlogReactionsUIProps {
  slug: string;
  mood?: Blog['mood'];
}

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

const BlogReactionsUI = async ({ slug, mood }: BlogReactionsUIProps) => {
  const reactions = await getReactions(slug);

  return <BlogReactions id={slug} mood={mood} reactions={reactions} />;
};

export default BlogReactionsUI;
