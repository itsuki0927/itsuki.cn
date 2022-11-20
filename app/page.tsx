/* import { NextSeo } from 'next-seo'; */
import { getBannerBlogs, getHotBlogs, getRecentBlogs } from '@/api/blog';
import { getRecentComments } from '@/api/comment';
import { getSiteSummary } from '@/api/summary';
import { getAllTags } from '@/api/tag';
import Layout from '@/components/common/Layout';
import Container from '@/components/ui/Container';
import HomeBanner from '@/components/home/Banner';
import LastestContent from '@/components/home/LastestContent';
import HomeSidebar from '@/components/home/Sidebar';
import { Blog } from '@/entities/blog';
import { Comment } from '@/entities/comment';
import { SiteSummary } from '@/entities/summary';
import { SearchResponse } from '@/types/response';
import { Tag } from '@/entities/tag';

export const revalidate = 3600;

const fetchData = async () => {
  const promise = await Promise.all([
    getRecentBlogs(),
    getHotBlogs(),
    getAllTags(),
    getBannerBlogs(),
    getRecentComments(),
    getSiteSummary(),
  ]);

  return {
    promise,
  };
};

export interface HomePageProps {
  blogs: SearchResponse<Blog>;
  tags: Tag[];
  bannerBlogs: SearchResponse<Blog>;
  hotBlogs: SearchResponse<Blog>;
  comments: SearchResponse<Comment>;
  siteSummary: SiteSummary;
}

const Page = async () => {
  const { promise } = await fetchData();
  console.log('data', promise);
  return (
    <Layout className='mb-12 space-y-8' footerTheme='reverse'>
      {/* <NextSeo defaultTitle='五块木头' /> */}

      <HomeBanner bannerBlogs={promise[3]} siteSummary={promise[5]} />

      <Container className='flex flex-col sm:flex-row'>
        <LastestContent blogs={promise[0]} comments={promise[4]} />
        <HomeSidebar hotBlogs={promise[1]} tags={promise[2]} />
      </Container>
    </Layout>
  );
};

export default Page;
