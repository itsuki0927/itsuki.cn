import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import { NextSeo } from 'next-seo';
import { getBannerArticles, getRecentArticles } from '@/api/article';
import { getAllTags } from '@/api/tag';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import { HomeSlider, Layout, Navbar } from '@/components/common';
import { RightOutlined } from '@/components/icons';
import { articleKeys, tagKeys } from '@/constants/queryKeys';
import useBannerArticles from '@/hooks/article/useBannerArticles';
import useRecentArticles from '@/hooks/article/useRecentArticles';
import useTags from '@/hooks/tag';
import { getTagRoute } from '@/utils/url';

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
    <Layout
      hero={
        <div className='space-y-20 bg-white py-10'>
          <Navbar />

          <HomeSlider articles={bannerArticles?.data} />
        </div>
      }
    >
      <NextSeo defaultTitle='五木' />
      <div className='home space-y-6' id='dashboard'>
        <div className='prose max-w-full'>
          <section className='space-y-4'>
            <div className='flex items-end justify-between px-4'>
              <h2 className='capsize mb-5'>最近文章</h2>
              <Link href='/blog'>
                <p className='flex cursor-pointer items-center transition-colors hover:text-primary'>
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
                    key={tag.path}
                    className='mr-4 mb-4 rounded-sm bg-white-2 py-1 px-4 align-bottom hover:bg-white-3 sm:py-[6px] sm:px-6'
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
