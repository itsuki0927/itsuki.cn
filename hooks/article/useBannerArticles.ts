import { useQuery } from 'react-query';
import { getBannerArticles } from '@/api/article';
import { articleKeys } from '@/constants/queryKeys';

const useBannerArticles = () => useQuery(articleKeys.banner(), () => getBannerArticles());

export type UseBannerArticles = ReturnType<typeof useBannerArticles>;

export default useBannerArticles;
