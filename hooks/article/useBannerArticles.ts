import { useQuery } from 'react-query';
import { getBannerArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useBannerArticles = () => useQuery(articleKeys.banner(), () => getBannerArticles());

export default useBannerArticles;
