import AboutView from '@/components/about/index';
import { NavbarLayout } from '@/components/common';
import blog from '@/lib/api/blog';

export const getStaticProps = async () => {
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      ...siteInfo,
    },
  };
};

const AboutPage = () => <AboutView />;

AboutPage.Layout = NavbarLayout;

export default AboutPage;
