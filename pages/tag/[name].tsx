import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query';
import { getArticles } from '@/api/article';
import { getAllTagPaths, getAllTags } from '@/api/tag';
import { ArticleSkeletonList } from '@/components/article';
import BlogList from '@/components/blog/BlogList';
import { Layout } from '@/components/common';
import { createQueryClient } from '@/components/common/QueryClientContainer';
import { Container } from '@/components/ui';
import FooterBanner from '@/components/ui/FooterBanner';
import { GAEventCategories } from '@/constants/gtag';
import { articleKeys, tagKeys } from '@/constants/queryKeys';
import { TIMESTAMP } from '@/constants/value';
import { useMount } from '@/hooks';
import { useTagArticles } from '@/hooks/article';
import useTags from '@/hooks/tag';
import { gtag } from '@/utils/gtag';

export const getStaticPaths = async () => {
  const paths = await getAllTagPaths();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const tagPath = (params?.name ?? '') as string;

  const queryClient = createQueryClient();
  await queryClient.prefetchQuery(tagKeys.lists(), () => getAllTags());
  await queryClient.prefetchQuery(articleKeys.tag(tagPath), () =>
    getArticles({ tagPath })
  );

  return {
    props: {
      tagPath,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: TIMESTAMP.DAY / 1000,
  };
};

const ArticleTagPage = ({
  tagPath,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useTagArticles(tagPath);
  const { data } = useTags();
  const { isFallback } = useRouter();
  const tag = data ? data.find(item => item.path === tagPath) : undefined;

  useMount(() => {
    gtag.event('tag_view', {
      category: GAEventCategories.Tag,
      label: tag?.name,
    });
  });

  if (isFallback || articles.isFetching || articles.isLoading) {
    return (
      <Layout>
        <div className='space-y-6'>
          <ArticleSkeletonList />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NextSeo title={tag?.name} />

      <div className='bg-gray-50'>
        <div className='container overflow-hidden py-16 sm:flex sm:flex-row sm:items-start sm:justify-between sm:py-24'>
          <div className='flex flex-col justify-center'>
            <h1 className='text-3xl font-medium tracking-tight text-gray-900 md:text-5xl'>
              标签: {tag?.name} ({tag?.count})
            </h1>
            <p className='mt-4 max-w-sm text-lg text-gray-600 sm:hidden'>
              {tag?.description}
            </p>
          </div>

          <p className='hidden max-w-sm text-xl text-gray-600 sm:block'>
            {tag?.description}
          </p>
        </div>
      </div>

      <Container className='py-24'>
        <BlogList {...articles} />
      </Container>

      <FooterBanner />
    </Layout>
  );
};

export default ArticleTagPage;
