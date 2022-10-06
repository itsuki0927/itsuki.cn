import { useQuery } from 'react-query';
import { getBannerBlogs } from '@/api/blog';
import { blogKeys } from '@/constants/queryKeys';

const useBannerBlogs = () => useQuery([...blogKeys.banner()], () => getBannerBlogs());

export default useBannerBlogs;
