import { HeaderLayout } from '@/components/common';
import { InternalServerErrorView } from '@/components/errors';
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

export default function InternalServerError() {
  return <InternalServerErrorView />;
}

InternalServerError.Layout = HeaderLayout;
