import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import { Banner } from '@/components/ui';
import blog from '@/lib/api/blog';

export const getStaticPaths = async () => {
  const { tags } = await blog.getAllTagPaths();
  const paths = tags.map(tag => `/tag/${tag.path}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const tagName = (params?.name ?? '') as string;

  const siteInfo = await blog.getSiteInfo();
  const articles = await blog.getAllArticles({
    variables: {
      tag: tagName,
    },
  });
  const tag = siteInfo.tags.find(item => item.path === tagName)!;

  return {
    props: {
      ...siteInfo,
      tag,
      articles,
    },
    revalidate: 10,
  };
};

const ArticleTagPage = ({
  tag,
  articles,
}: InferGetServerSidePropsType<typeof getStaticProps>) => (
  <>
    <NextSeo title={`${tag.name} - ${tag.path} - Tag`} description={tag.description} />

    <Banner data={tag} className='mb-6' />

    <ArticleList articles={articles} />
  </>
);

ArticleTagPage.Layout = Layout;

export default ArticleTagPage;
