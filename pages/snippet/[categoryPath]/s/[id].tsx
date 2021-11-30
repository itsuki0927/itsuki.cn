import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { NavbarLayout } from '@/components/common';
import { SnippetCodeView } from '@/components/snippet';
import blog from '@/lib/api/blog';
import {
  getSnippetDetailUrl,
  getSnippetPageCategoryUrl,
  getSnippetRootCategoryUrl,
} from '@/transformers/url';
import markedToHtml, { genMarkdownString } from '@/utils/marked';

export const getStaticPaths = async () => {
  const { snippets } = await blog.getAllSnippetPaths();

  const paths = snippets.map(snippet =>
    getSnippetDetailUrl(snippet.categoryPath, snippet.id)
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const snippetId = Number(params?.id);

  const { snippet } = await blog.getSnippet({ variables: { snippetId } });
  snippet.categories.sort((a, b) => a.parentId - b.parentId);
  const [rootCategory, ...restCategories] = snippet.categories;

  const siteInfo = await blog.getSiteInfo();

  snippet.skillHtml = markedToHtml(snippet.skill);
  snippet.codeHtml = markedToHtml(genMarkdownString(snippet.code, 'js'));
  snippet.exampleHtml = markedToHtml(genMarkdownString(snippet.example, 'js'));

  const breadcrumbs = [
    { url: '/snippet', name: 'snippet' },
    {
      url: getSnippetRootCategoryUrl(rootCategory.path),
      name: rootCategory.name,
    },
    ...restCategories.map(category => ({
      url: getSnippetPageCategoryUrl(rootCategory.path, category.path),
      name: category.name,
    })),
    {
      url: getSnippetDetailUrl(rootCategory.path, snippetId),
      name: snippet.name,
    },
  ];

  return {
    props: {
      snippet,
      breadcrumbs,
      ...siteInfo,
    },
    revalidate: 10,
  };
};

const SnippetCode = ({
  snippet,
  breadcrumbs,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <SnippetCodeView snippet={snippet} breadcrumbs={breadcrumbs} />
);

SnippetCode.Layout = NavbarLayout;

export default SnippetCode;
