import { ArrowRight } from 'react-feather';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import { getBannerArticles, getRecentArticles } from '@/api/article';
import { getAllTags } from '@/api/tag';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import { HomeSlider, Layout, MyImage } from '@/components/common';
import { RightOutlined } from '@/components/icons';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys, tagKeys } from '@/constants/queryKeys';
import useBannerArticles from '@/hooks/article/useBannerArticles';
import useRecentArticles from '@/hooks/article/useRecentArticles';
import useTags from '@/hooks/tag';
import { gtag } from '@/utils/gtag';
import { getTagRoute } from '@/utils/url';
import BlogCard from '@/components/blog/BlogCard';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(articleKeys.recent(), () => getRecentArticles());
  await queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags());
  await queryClient.prefetchQuery(articleKeys.banner(), () => getBannerArticles());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
};

const HomePage = () => {
  const articles = useRecentArticles();
  const { data: tags } = useTags();
  const { data: bannerArticles } = useBannerArticles();

  if (articles.isLoading || articles.isFetching) {
    return (
      <Layout>
        <ArticleSkeletonList />
      </Layout>
    );
  }

  return (
    <Layout>
      <NextSeo defaultTitle='五块木头' />
      <div className='container bg-white py-8'>
        <div className='flex'>
          <HomeSlider articles={bannerArticles?.data} />

          <div className='ml-8 flex flex-col sm:w-1/3 '>
            <div className='flex justify-between bg-gray-50 p-6'>
              <div>
                <div className='text-gray-500'>要做一个很酷的人</div>
                <div className='text-2xl text-gray-900'>
                  你好, 我是
                  <span className='ml-1 font-semibold text-primary'>五块木头</span>
                </div>
              </div>

              <MyImage src='/avatar.jpeg' width={60} height={60} circle />
            </div>
            <div className='mt-8 bg-gray-50 p-6'>
              <div className='mb-2 text-gray-500'>博客简介：</div>
              <div className='flex flex-wrap '>
                <span className='mx-2 inline-flex flex-grow items-center'>
                  <strong className='text-2xl text-gray-900'>155</strong>
                  <span className='ml-2 text-sm text-gray-500'>篇博客</span>
                </span>
                <span className='mx-2 inline-flex flex-grow items-center '>
                  <strong className='text-2xl text-gray-900'>155</strong>
                  <span className='ml-2 text-sm text-gray-500'>个标签</span>
                </span>
                <span className='mx-2 inline-flex flex-grow items-center '>
                  <strong className='text-2xl text-gray-900'>155</strong>
                  <span className='ml-2 text-sm text-gray-500'>条评论</span>
                </span>
                <span className='mx-2 inline-flex flex-grow items-center '>
                  <strong className='text-2xl text-gray-900'>155</strong>
                  <span className='ml-2 text-sm text-gray-500'>条留言</span>
                </span>
                <span className='mx-2 inline-flex flex-grow items-center '>
                  <strong className='text-2xl text-gray-900'>155</strong>
                  <span className='ml-2 text-sm text-gray-500'>天前建站</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='bg-gray-50 p-6 text-gray-600'>
          一个平平无奇的Banner区域(如果你要问我有什么用? 装饰!!!)
        </div>
      </div>

      <div className='container'>
        <div className='sm:max-w-[800px]'>
          <div className='my-8 flex items-end justify-between'>
            <span className='text-2xl text-gray-900'>最近文章</span>
            <Link href='/blog'>
              <span className='flex cursor-pointer items-center transition-colors duration-100 hover:text-primary'>
                查看更多
                <ArrowRight size={16} className='ml-2' />
              </span>
            </Link>
          </div>

          <div className='flex flex-wrap items-center gap-6 sm:gap-8 sm:space-y-0'>
            {articles.data?.data.slice(0, 4).map((blog, i) => (
              <BlogCard
                blog={blog}
                key={blog.id}
                style={{ animationDelay: `${0.2 * i}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='home space-y-6' id='dashboard'>
        <div className='prose max-w-full'>
          <section className='space-y-4'>
            <div className='flex items-end justify-between px-4'>
              <h2 className='capsize mb-5'>最近文章</h2>
              <Link href='/blog'>
                <p
                  className='flex cursor-pointer items-center transition-colors hover:text-primary'
                  onClick={() => {
                    gtag.event('find_article_more', {
                      category: GAEventCategories.Article,
                    });
                  }}
                >
                  <span className='capsize mr-2'>查看更多</span>
                  <RightOutlined />
                </p>
              </Link>
            </div>
            <ArticleList {...articles} />
          </section>
        </div>

        <div className='prose max-w-full'>
          <section className='space-y-4'>
            <div className='flex items-end justify-between px-4'>
              <h2 className='capsize mb-5'>标签</h2>
              <p>{tags?.length} Tags</p>
            </div>
            <div className='not-prose flex flex-wrap px-4'>
              {tags?.map(tag => (
                <Link key={tag.path} href={getTagRoute(tag.path)}>
                  <a
                    tabIndex={0}
                    role='button'
                    key={tag.path}
                    className='mr-4 mb-4 rounded-sm bg-white-2 py-1 px-4 align-bottom hover:bg-white-3 sm:py-[6px] sm:px-6'
                    onClick={() => {
                      gtag.event('tag', {
                        category: GAEventCategories.Tag,
                        label: tag.name,
                      });
                    }}
                  >
                    {tag.name}
                  </a>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className='prose max-w-full'>
          <section className='space-y-4'>
            <div className='flex items-end justify-between px-4'>
              <h2 className='capsize mb-5'>代办</h2>
              <p>3 Actives</p>
            </div>
            <ul className='flex flex-col px-4'>
              <li>更新UI...</li>
              <li>写文章中...</li>
              <li>暗黑模式...</li>
              <li className='line-through'>移动端样式...</li>
              <li className='line-through'>完成新版样式...</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
