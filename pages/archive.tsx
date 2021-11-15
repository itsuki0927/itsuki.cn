import { InferGetStaticPropsType } from 'next';
import ArchiveView from '@/components/archive';
import { NavbarLayout } from '@/components/common';
import blog from '@/lib/api/blog';

export const getStaticProps = async () => {
  const { archives } = await blog.getArchives();
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      archives,
      ...siteInfo,
    },
  };
};

const ArchivePage = ({ archives }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <ArchiveView archives={archives} />
);

ArchivePage.Layout = NavbarLayout;
export default ArchivePage;
