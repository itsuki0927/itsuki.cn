import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import AboutView from '@/components/about/index';
import { NavbarLayout } from '@/components/common';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('globalData', () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const AboutPage = () => <AboutView />;

AboutPage.Layout = NavbarLayout;

export default AboutPage;
