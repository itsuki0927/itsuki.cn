import { Search } from 'react-feather';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import classNames from 'classnames';
import { getArticles } from '@/api/article';
import { getAllTags } from '@/api/tag';
import { Layout } from '@/components/common';
import { articleKeys, tagKeys } from '@/constants/queryKeys';
import { useArticles } from '@/hooks/article';
import useTags from '@/hooks/tag';
import BlogList from '@/components/blog/BlogList';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(articleKeys.lists(), () => getArticles());
  await queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
};

const BlogPage = () => {
  const { data, ...rest } = useArticles();
  const { data: tags } = useTags();
  const [searchValue, setSearchValue] = useState('');
  const [activeTagName, setActiveTagName] = useState<string>('all');

  const allTags = [{ name: 'all', path: 'all' }].concat(tags ?? []);
  const filteredBlogPosts =
    data?.data.filter(post => {
      const lowerSearchValue = searchValue.toLowerCase();
      const macthKeyword = post.title.toLowerCase().includes(lowerSearchValue);
      if (activeTagName !== 'all') {
        const includeTag = post.tags.some(tag => tag.name === activeTagName);
        if (lowerSearchValue) {
          return includeTag && macthKeyword;
        }
        return includeTag;
      }
      return macthKeyword;
    }) ?? [];

  return (
    <Layout
      headerTheme='white'
      banner={
        <div className='bg-gray-50'>
          <div className='container flex flex-col items-start justify-between py-16 sm:flex-row sm:py-24'>
            <div className='flex flex-col justify-center'>
              <h1 className='text-3xl font-medium tracking-tight text-gray-900 md:text-5xl'>
                文章
              </h1>
              <p className='mt-4 max-w-sm text-lg text-gray-600 sm:hidden'>
                这里的每一个文字, 都是我走过的路 这里的每一个文字, 都是我走过的路
                这里的每一个文字, 都是我走过的路
              </p>
              <div className='mt-10 flex flex-col sm:flex-row sm:items-start'>
                <div className='flex w-full flex-col'>
                  <div className='relative'>
                    <input
                      aria-label='Search articles'
                      type='text'
                      onChange={e => setSearchValue(e.target.value)}
                      placeholder='搜索文章'
                      className='block w-96 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500'
                    />
                    <Search className='absolute top-3 right-4 text-gray-400 sm:right-6' />
                  </div>
                  <p className='mt-2 text-sm text-gray-600'>
                    输入你想了解的内容, 比如说
                    <span className='ml-1 underline'>网易、字节</span>
                  </p>
                </div>
              </div>
            </div>

            <p className='hidden max-w-sm text-xl text-gray-600 sm:block'>
              这里的每一个文字, 都是我走过的路 这里的每一个文字, 都是我走过的路
              这里的每一个文字, 都是我走过的路
            </p>
          </div>
        </div>
      }
    >
      <NextSeo title='文章' />
      <div className='container py-24' id='dashboard'>
        <div className='mb-16 hidden sm:block'>
          <div className='flex space-x-3'>
            {allTags?.map(tag => (
              <button
                type='button'
                onClick={() => setActiveTagName(tag.name)}
                className={classNames(
                  'rounded-md px-6 py-2 transition-colors hover:bg-gray-50',
                  activeTagName === tag?.path ? 'bg-gray-50' : ''
                )}
                key={tag.path}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className='prose max-w-full'>
          <BlogList
            {...rest}
            data={
              {
                ...data,
                data: filteredBlogPosts ?? [],
                total: filteredBlogPosts?.length ?? 0,
              } as any
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
