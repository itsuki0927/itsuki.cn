import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, Plus } from 'react-feather';
import { dehydrate } from 'react-query';
import { getBannerBlogs, getHotBlogs, getRecentBlogs } from '@/api/blog';
import { getRecentComments } from '@/api/comment';
import { getSiteSummary } from '@/api/summary';
import { getAllTags } from '@/api/tag';
import { BlogSkeletonList } from '@/components/blog';
import BlogCard from '@/components/blog/BlogCard';
import CommentList from '@/components/comment/CommentList';
import { HomeSlider, Layout, MyImage, ToDate } from '@/components/common';
import { createQueryClient } from '@/components/common/QueryClientContainer';
import MessageSvg from '@/components/icons/MessageSvg';
import { Container } from '@/components/ui';
import PtnContainer from '@/components/ui/PtnContainer';
import SocialButton, { defaultSocials } from '@/components/ui/SocialButton';
import Status from '@/components/ui/Status';
import { GAEventCategories } from '@/constants/gtag';
import { blogKeys, commentKeys, summaryKeys, tagKeys } from '@/constants/queryKeys';
import { TIMESTAMP } from '@/constants/value';
import { useBannerBlogs, useHotBlogs, useRecentBlogs } from '@/hooks/blog';
import { useRecentComments } from '@/hooks/comment';
import { useSiteSummary } from '@/hooks/summary';
import { useTags } from '@/hooks/tag';
import { getDayTotals } from '@/utils/date';
import { gtag } from '@/utils/gtag';
import { getBlogDetailRoute, getTagRoute } from '@/utils/url';

const todoList = [
  { name: '新版UI', percent: '60%' },
  { name: '不知道写什么博客', percent: '10%' },
  { name: '阅读React-Query中', percent: '50%' },
];

export const getStaticProps = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(blogKeys.recent(), () => getRecentBlogs());
  await queryClient.prefetchQuery(blogKeys.hot(), () => getHotBlogs());
  await queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags());
  await queryClient.prefetchQuery(blogKeys.banner(), () => getBannerBlogs());
  await queryClient.prefetchQuery(commentKeys.recent(), () => getRecentComments());
  await queryClient.prefetchQuery(summaryKeys.summary(), () => getSiteSummary());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: TIMESTAMP.DAY / 1000,
  };
};

const HomePage = () => {
  const blogs = useRecentBlogs();
  const { data: tags } = useTags();
  const { data: bannerBlogs } = useBannerBlogs();
  const { data: hotBlogs } = useHotBlogs();
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
  const router = useRouter();

  if (blogs.isFetching) {
    return (
      <Layout>
        <BlogSkeletonList />
      </Layout>
    );
  }

  return (
    <Layout className='mb-12 space-y-8' footerTheme='reverse'>
      <NextSeo defaultTitle='五块木头' />
      <Container className='flex flex-col space-y-8 pt-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
        <HomeSlider blogs={bannerBlogs?.data} />

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
                <strong className='text-2xl text-gray-900'>{siteSummary?.blog}</strong>
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

          <div className='flex flex-grow flex-wrap items-center gap-6 sm:gap-8 sm:space-y-0'>
            {blogs.data?.data.map((blog, i) => (
              <BlogCard
                blog={blog}
                key={blog.id}
                style={{ animationDelay: `${0.2 * i}s` }}
              />
            ))}
          </div>

          <div className='flex items-center justify-between bg-gray-50 p-6'>
            <span className='text-2xl text-gray-900'>最近留言</span>
            <Link href='/guestbook'>
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
              renderEmpty={() => (
                <Status
                  title='空空如也'
                  icon={<MessageSvg />}
                  description='我也想展示评论, 奈何数据库一条都没得'
                >
                  <Status.Button
                    className='mt-4'
                    onClick={() => router.push('/guestbook')}
                  >
                    <Plus size={16} className='mr-1' />
                    <span>添加评论</span>
                  </Status.Button>
                </Status>
              )}
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
            {hotBlogs?.data.slice(0, 6).map(blog => (
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

          <div className='space-y-4 bg-gray-50 p-6'>
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
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default HomePage;
