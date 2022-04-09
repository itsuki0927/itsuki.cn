import { dehydrate, QueryClient } from 'react-query';
import { getArchives } from '@/api/article';
import ArchiveView from '@/components/archive';
import { NavbarLayout } from '@/components/common';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useArchives } from '@/hooks/article';
import { getGlobalData } from '@/api/global';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(articleKeys.archive(), () => getArchives());
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600,
  };
};

const ArchivePage = () => {
  const archives = useArchives();
  return <ArchiveView archives={archives?.data} />;
};

ArchivePage.Layout = NavbarLayout;
export default ArchivePage;
