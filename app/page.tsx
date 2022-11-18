import { getBannerBlogs, getHotBlogs, getRecentBlogs } from '@/api/blog';
import { getRecentComments } from '@/api/comment';
import { getSiteSummary } from '@/api/summary';
import { getAllTags } from '@/api/tag';
import HomePage from './HomePage';

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
    <HomePage
      blogs={promise[0]}
      bannerBlogs={promise[3]}
      hotBlogs={promise[1]}
      tags={promise[2]}
      comments={promise[4]}
      siteSummary={promise[5]}
    />
  );
};

export default Page;
