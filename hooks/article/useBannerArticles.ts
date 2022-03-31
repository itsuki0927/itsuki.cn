import { useQuery } from 'react-query';
import { getBannerArticles } from '@/api/article';

const useBannerArticles = () => useQuery('bannerArticles', () => getBannerArticles());

export default useBannerArticles;
