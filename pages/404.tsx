import { HeaderLayout } from '@/components/common';
import NotFoundView from '@/components/notfound/NotFoundView';
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

NotFound.Layout = HeaderLayout;
