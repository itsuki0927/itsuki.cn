/* import { dehydrate } from '@tanstack/react-query'; */
import { getBannerBlogs, getHotBlogs, getRecentBlogs } from '@/api/blog';
import { getRecentComments } from '@/api/comment';
import { getSiteSummary } from '@/api/summary';
import { getAllTags } from '@/api/tag';
import { HomeSlider } from '@/components/home';
import { Container } from '@/components/ui';
/* import HomePage from './HomePage'; */

export const revalidate = 60;

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

const Page = async () => {
  const { promise } = await fetchData();
  console.log('data', promise);
  return (
    <div>
      {/* <HomePage /> */}
      <div>age</div>

      <Container className='flex flex-col space-y-8 pt-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
        <HomeSlider blogs={promise[3]?.data} />
      </Container>
    </div>
  );
};

export default Page;
