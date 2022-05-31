import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getArchives } from '@/api/article';
import ArchiveView from '@/components/archive';
import { Layout } from '@/components/common';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useArchives } from '@/hooks/article';
import { getGlobalData } from '@/api/global';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

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

  useMount(() => {
    gtag.event('archive', {
      category: GAEventCategories.Archive,
    });
  });

  return <ArchiveView archives={archives.data} />;
};

ArchivePage.getLayout = (page: ReactNode) => <Layout showSidebar={false}>{page} </Layout>;

export default ArchivePage;
