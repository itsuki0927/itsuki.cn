import { getBannerBlogs, getHotBlogs, getRecentBlogs } from '@/api/blog';
import { getRecentComments } from '@/api/comment';
import { getSiteSummary } from '@/api/summary';
import { getAllTags } from '@/api/tag';
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
  /* return <HomePage />; */
  return 'home';
};

export default Page;
