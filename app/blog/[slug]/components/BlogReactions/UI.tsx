import { VERCEL_ENV } from '@/constants/env';
import { kvKeys } from '@/constants/kv';
import buildUrl from '@/utils/buildUrl';
import BlogReactions from './index';
import getBlog from '@/libs/notion/getBlog';
import { BlogPageProps } from '../../page';

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

const BlogReactionsUI = async ({ slug }: BlogPageProps['params']) => {
  const { blog } = (await getBlog(slug)) || {};
  const reactions = await getReactions(slug);

  return <BlogReactions id={slug} mood={blog.mood} reactions={reactions} />;
};

export default BlogReactionsUI;
