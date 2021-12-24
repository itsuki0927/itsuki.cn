import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { NavbarLayout } from '@/components/common';
import { SnippetList } from '@/components/snippet';
import { Loading } from '@/components/ui';
import useSearch from '@/framework/local/snippet/use-search';
import { getSearchStaticProps } from '@/lib/search-prop';

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context);
}

const SnippetSearchPage = () => {
  const router = useRouter();
  const keyword = String(router.query.keyword ?? '');
  const { data } = useSearch({ keyword });

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Keyword: {router.query.keyword}</h1>

      <SnippetList snippets={data.snippets} />
    </div>
  );
};

SnippetSearchPage.Layout = NavbarLayout;

export default SnippetSearchPage;
