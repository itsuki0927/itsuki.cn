import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import { getBannerArticles, getRecentArticles } from '@/api/article';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import { HomeSlider, Layout, Navbar } from '@/components/common';
import { articleKeys, tagKeys } from '@/constants/queryKeys';
import { RightOutlined } from '@/components/icons';
import { getTagRoute } from '@/utils/url';
import { getAllTags } from '@/api/tag';
import useTags from '@/hooks/tag';
import useBannerArticles from '@/hooks/article/useBannerArticles';
import useRecentArticles from '@/hooks/article/useRecentArticles';

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
    return <ArticleSkeletonList />;
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
            <div className='flex flex-wrap space-y-4 space-x-4 px-4'>
              {tags?.map(tag => (
                <Link href={getTagRoute(tag.path)}>
                  <a
                    key={tag.path}
                    className='rounded-sm bg-white-2 py-[6px] px-6 hover:bg-white-3'
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
