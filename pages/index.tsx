import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { dehydrate, QueryClient } from 'react-query';
import { getBannerArticles, getHotArticles, getRecentArticles } from '@/api/article';
import { getRecentComments } from '@/api/comment';
import { getSiteSummary } from '@/api/summary';
import { getAllTags } from '@/api/tag';
import { ArticleSkeletonList } from '@/components/article';
import BlogCard from '@/components/blog/BlogCard';
import CommentList from '@/components/comment/CommentList';
import { HomeSlider, Layout, MyImage, ToDate } from '@/components/common';
import { Container } from '@/components/ui';
import PtnContainer from '@/components/ui/PtnContainer';
import SocialButton, { defaultSocials } from '@/components/ui/SocialButton';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys, commentKeys, summaryKeys, tagKeys } from '@/constants/queryKeys';
import useBannerArticles from '@/hooks/article/useBannerArticles';
import useHotArticles from '@/hooks/article/useHotArticles';
import useRecentArticles from '@/hooks/article/useRecentArticles';
import { useRecentComments } from '@/hooks/comment';
import useTags from '@/hooks/tag';
import useSiteSummary from '@/hooks/useSummary';
import { getDayTotals } from '@/utils/date';
import { gtag } from '@/utils/gtag';
import { getBlogDetailRoute, getTagRoute } from '@/utils/url';

const todoList = [
  { name: '新版UI', percent: '60%' },
  { name: '不知道写什么博客', percent: '10%' },
  { name: '阅读React-Query中', percent: '50%' },
];

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(articleKeys.recent(), () => getRecentArticles());
  await queryClient.prefetchQuery(articleKeys.hot(), () => getHotArticles());
  await queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags());
  await queryClient.prefetchQuery(articleKeys.banner(), () => getBannerArticles());
  await queryClient.prefetchQuery(commentKeys.recent(), () => getRecentComments());
  await queryClient.prefetchQuery(summaryKeys.summary(), () => getSiteSummary());

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
  const { data: hotArticles } = useHotArticles();
  const { data: comments } = useRecentComments();
  const { data: siteSummary } = useSiteSummary();
  const {
    dayInYearTotal,
    dayInYear,
    dayInMonthTotal,
    dayInMonth,
    dayInWeekTotal,
    dayInWeek,
    hourInDayTotal,
    hourInDay,
  } = getDayTotals();

  if (articles.isLoading || articles.isFetching) {
    return (
      <Layout>
        <ArticleSkeletonList />
      </Layout>
    );
  }

  return (
    <Layout className='mb-12 space-y-8' footerTheme='reverse'>
      <NextSeo defaultTitle='五块木头' />
      <Container className='flex flex-col space-y-8 pt-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
        <HomeSlider articles={bannerArticles?.data} />

        <div className='flex flex-col justify-between sm:mt-0 sm:w-1/3'>
          <div className='bg-gray-50 p-6'>
            <div className='flex justify-between pb-3'>
              <div>
                <div className='text-gray-500'>要做一个很酷的人</div>
                <div className='text-2xl text-gray-900'>
                  你好, 我是
                  <Link href='/about'>
                    <span className='ml-1 cursor-pointer font-semibold text-primary transition-colors hover:text-primary-hover'>
                      五块木头
                    </span>
                  </Link>
                </div>
              </div>

              <MyImage src='/avatar.jpeg' width={60} height={60} circle />
            </div>

            <div className='flex flex-row items-center space-x-2 border-t border-dashed border-gray-300 pt-4 sm:space-x-4'>
              {defaultSocials.map(social => (
                <SocialButton
                  social={social}
                  className='flex-shrink px-5 py-1 text-center'
                  key={social.name}
                >
                  {social.icon}
                </SocialButton>
              ))}
            </div>
          </div>

          <PtnContainer className='mt-8 p-6'>
            <div className='mb-2 text-gray-500'>博客概览</div>
            <div className='flex flex-wrap '>
              <span className='mr-4 items-center'>
                <strong className='text-2xl text-gray-900'>{siteSummary?.article}</strong>
                <span className='ml-2 text-sm text-gray-500'>篇博客</span>
              </span>
              <span className='mr-4 items-center '>
                <strong className='text-2xl text-gray-900'>{siteSummary?.tag}</strong>
                <span className='ml-2 text-sm text-gray-500'>个标签</span>
              </span>
              <span className='mr-4 items-center '>
                <strong className='text-2xl text-gray-900'>{siteSummary?.comment}</strong>
                <span className='ml-2 text-sm text-gray-500'>条评论</span>
              </span>
              <span className='mr-4 items-center '>
                <strong className='text-2xl text-gray-900'>
                  {((siteSummary?.reading ?? 0) / 1000).toFixed(1)}K
                </strong>
                <span className='ml-2 text-sm text-gray-500'>次阅读</span>
              </span>
              <span className='mr-4 items-center '>
                <strong className='text-2xl text-gray-900'>
                  {siteSummary?.guestbook}
                </strong>
                <span className='ml-2 text-sm text-gray-500'>条留言</span>
              </span>
              <span className='mr-4 items-center '>
                <strong className='text-2xl text-gray-900'>
                  <ToDate date={siteSummary?.startTime ?? new Date()} to='ago' />
                </strong>
                <span className='ml-2 text-sm text-gray-500'>建站</span>
              </span>
            </div>
          </PtnContainer>
        </div>
      </Container>

      <Container className='flex flex-col sm:flex-row'>
        <div className='space-y-8 sm:max-w-[800px]'>
          <div className='flex flex-grow items-center justify-between bg-gray-50 p-6'>
            <span className='text-2xl text-gray-900'>最近文章</span>
            <Link href='/blog'>
              <span className='flex cursor-pointer items-center text-primary transition-colors duration-100 hover:text-primary'>
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

          <div className='flex items-center justify-between bg-gray-50 p-6'>
            <span className='text-2xl text-gray-900'>最近留言</span>
            <Link href='/blog'>
              <span className='flex cursor-pointer items-center text-primary transition-colors duration-100 hover:text-primary'>
                查看更多
                <ArrowRight size={16} className='ml-2' />
              </span>
            </Link>
          </div>

          <div className='flex flex-col '>
            <CommentList
              data={comments?.data.slice(0, 2)}
              className='space-y-6 sm:space-y-8'
            />
          </div>
        </div>

        <div className='mt-8 flex-grow space-y-6 border-t border-dashed border-t-gray-200 pt-8 sm:mt-0 sm:ml-8 sm:max-w-sm sm:space-y-8 sm:border-none sm:pt-0'>
          <div className='flex h-20 items-center justify-between bg-gray-50 p-6'>
            <span>纵有疾风起, 人生不言弃</span>
            <span className='text-sm text-gray-400'>已跑步3800公里</span>
          </div>

          <ul className='flex flex-col space-y-2 bg-gray-50 p-6'>
            <li className='text-xl font-medium text-gray-900'>时间</li>
            <li className='text-gray-700'>
              当天已过 {hourInDay} / {hourInDayTotal}{' '}
            </li>
            <li className='text-gray-600'>
              本周已过 {dayInWeek} / {dayInWeekTotal}{' '}
            </li>
            <li className='text-gray-500'>
              本月已过 {dayInMonth} / {dayInMonthTotal}{' '}
            </li>
            <li className='text-gray-400'>
              本年已过 {dayInYear} / {dayInYearTotal}
            </li>
          </ul>

          <PtnContainer as='ul' className='flex flex-col space-y-2 p-6'>
            <div className='text-xl font-medium text-gray-900'>热门</div>
            {hotArticles?.data.slice(0, 6).map(blog => (
              <Link href={getBlogDetailRoute(blog.path)}>
                <li
                  key={blog.id}
                  className='cursor-pointer list-inside list-square transition-colors hover:text-primary'
                >
                  {blog.title}
                </li>
              </Link>
            ))}
          </PtnContainer>

          <ul className='flex flex-col space-y-2 bg-gray-50 p-6'>
            <div className='text-xl font-medium text-gray-900'>TODO</div>
            {todoList.map(todo => (
              <li
                key={todo.name}
                className='flex list-inside list-decimal items-center justify-between transition-colors'
              >
                <span>{todo.name}</span>

                <span className='text-sm text-gray-500'>{todo.percent}</span>
              </li>
            ))}
          </ul>

          <PtnContainer className='space-y-4 p-6'>
            <div className='text-xl font-medium text-gray-900'>标签</div>
            <ul className='flex flex-wrap'>
              {tags?.map(tag => (
                <Link key={tag.path} href={getTagRoute(tag.path)}>
                  <a
                    tabIndex={0}
                    role='button'
                    key={tag.path}
                    className='mr-4 mb-4 rounded-sm bg-gray-100 py-1 px-4 align-bottom hover:bg-gray-200 sm:py-[6px] sm:px-6'
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
            </ul>
          </PtnContainer>
        </div>
      </Container>
    </Layout>
  );
};

export default HomePage;
