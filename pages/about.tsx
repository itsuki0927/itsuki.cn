import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import AboutView from '@/components/about';
import { Layout } from '@/components/common';
import { globalDataKeys } from '@/constants/queryKeys';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const AboutPage = () => <AboutView />;

AboutPage.getLayout = (page: ReactNode) => <Layout showSidebar={false}>{page} </Layout>;

export default AboutPage;
