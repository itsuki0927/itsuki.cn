import { InferGetServerSidePropsType } from 'next';
import { NavbarLayout } from '@/components/common';
import { SnippetView } from '@/components/snippet';
import blog from '@/lib/api/blog';

export const getStaticProps = async () => {
  const snippets = await blog.getAllSnippets();
  const { snippetCategories } = await blog.getSnippetCategories({
    variables: { parentId: 0 },
  });
  const siteInfo = await blog.getSiteInfo();

  return {
    props: {
      snippets,
      snippetCategories,
      ...siteInfo,
    },
    revalidate: 10,
  };
};

const SnippetPage = ({
  snippets,
  snippetCategories,
}: InferGetServerSidePropsType<typeof getStaticProps>) => (
  <SnippetView snippets={snippets} snippetCategories={snippetCategories} />
);

SnippetPage.Layout = NavbarLayout;

export default SnippetPage;
