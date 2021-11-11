import { InferGetServerSidePropsType } from 'next';
import { NavbarLayout } from '@/components/common';
import { SnippetView } from '@/components/snippet';
import blog from '@/lib/api/blog';

export const getStaticProps = async () => {
  const snippets = await blog.getAllSnippets();
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      snippets,
      ...siteInfo,
    },
  };
};

const SnippetPage = ({
  snippets,
}: InferGetServerSidePropsType<typeof getStaticProps>) => (
  <SnippetView snippets={snippets} />
);

SnippetPage.Layout = NavbarLayout;

export default SnippetPage;
