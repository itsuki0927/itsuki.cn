import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';
import { NavbarLayout } from '@/components/common';
import { SnippetListView } from '@/components/snippet';
import { SnippetCategory } from '@/entities/snippetCategory';
import blog from '@/lib/api/blog';
import convertToTreeData from '@/utils/tree';
import { getSnippetPageCategoryUrl, getSnippetRootCategoryUrl } from '@/utils/url';

const getSnippetStaticPaths = (data: SnippetCategory[], id?: number) => {
  const result: { path: string; name?: string }[] = [];
  convertToTreeData(data)
    .filter(id === undefined ? () => true : v => v.id === id)
    .forEach(parent => {
      result.push({ path: getSnippetRootCategoryUrl(parent.path), name: parent.name });
      if (parent.children) {
        result.push(
          ...parent.children.map(child => ({
            path: getSnippetPageCategoryUrl(parent.path, child.path),
            name: child.name,
          }))
        );
      }
    });
  return result;
};

export const getStaticPaths = async () => {
  const { snippetCategories } = await blog.getSnippetCategories();
  const paths = getSnippetStaticPaths(snippetCategories.data).map(v => v.path);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ list: string[]; categoryPath: string }>) => {
  // ['t','type','p','1']
  const list = params?.list ?? [];

  const { snippetCategories } = await blog.getSnippetCategories();
  const siteInfo = await blog.getSiteInfo();

  const rootCategory = snippetCategories.data.find(
    item => item.path === params?.categoryPath
  )!;
  const paths = getSnippetStaticPaths(snippetCategories.data, rootCategory.id);
  const category =
    list.length > 2
      ? snippetCategories.data.find(item => item.path === list[1])!
      : rootCategory;

  const snippets = await blog.getAllSnippets({
    variables: { categoryPath: category.path, current: Number(list.pop()) ?? 1 },
  });

  return {
    props: {
      snippets,
      category,
      paths,
      rootCategory,
      ...siteInfo,
    },
    revalidate: 10,
  };
};

const SnippetListPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => (
  <SnippetListView {...props} />
);

SnippetListPage.Layout = NavbarLayout;

export default SnippetListPage;
