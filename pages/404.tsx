import { NavbarLayout } from '@/components/common';
import { NotFoundView } from '@/components/errors';
import blog from '@/lib/api/blog';

export const getStaticProps = async () => {
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      ...siteInfo,
    },
    revalidate: 200,
  };
};

export default function NotFound() {
  return <NotFoundView />;
}

NotFound.Layout = NavbarLayout;
