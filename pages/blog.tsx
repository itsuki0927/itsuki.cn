import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { Layout, Navbar } from '@/components/common';
import { articleKeys } from '@/constants/queryKeys';
import { getArticles, getHotArticles } from '@/api/article';
import { useArticles } from '@/hooks/article';
import { ArticleList } from '@/components/article';
import useHotArticles from '@/hooks/article/useHotArticles';
import { SearchOutlined } from '@/components/icons';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(articleKeys.lists(), () => getArticles());
  await queryClient.prefetchQuery(articleKeys.hot(), () => getHotArticles());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
};

const BlogPage = () => {
  const { data, ...rest } = useArticles();
  const hotArticles = useHotArticles();
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts =
    data?.data.filter(post =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? [];

  return (
    <Layout
      hero={
        <div className='space-y-20 bg-white py-10'>
          <Navbar />
          <div className='container px-4'>
            <h1 className='mb-4 text-3xl font-medium tracking-tight text-dark-3 md:text-5xl'>
              文章
            </h1>
            <p>这里的每一个文字, 都是我走过的路</p>
          </div>
        </div>
      }
    >
      <div className='home space-y-6' id='dashboard'>
        <div className='relative mt-10 flex w-full px-4'>
          <input
            aria-label='Search articles'
            type='text'
            onChange={e => setSearchValue(e.target.value)}
            placeholder='搜索文章'
            className='block w-full rounded-sm border border-gray-200 bg-white px-4 py-3 text-gray-900'
          />
          <SearchOutlined className='absolute right-6 top-3 h-5 w-5 text-lg text-gray-400' />
        </div>

        {!searchValue && (
          <div className='prose max-w-full'>
            <section className='space-y-4'>
              <div className='flex items-end justify-between px-4'>
                <h2>最热文章</h2>
              </div>
              <ArticleList {...hotArticles} />
            </section>
          </div>
        )}

        <div className='prose max-w-full'>
          <section className='space-y-4'>
            <div className='flex items-end justify-between px-4'>
              <h2>所有文章</h2>
            </div>
            <ArticleList
              {...rest}
              data={
                {
                  ...data,
                  data: filteredBlogPosts ?? [],
                  total: filteredBlogPosts?.length ?? 0,
                } as any
              }
            />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
