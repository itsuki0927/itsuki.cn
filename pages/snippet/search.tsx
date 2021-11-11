import { useRouter } from 'next/router';
import { NavbarLayout } from '@/components/common';
import { SnippetCard } from '@/components/snippet';
import useSearch from '@/framework/local/snippet/use-search';

const SnippetSearchPage = () => {
  const router = useRouter();
  const keyword = String(router.query.keyword ?? '');
  const { data } = useSearch({ keyword });

  return (
    <div>
      <h1>Keyword: {router.query.keyword}</h1>

      {data?.snippets.data.map(snippet => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};

SnippetSearchPage.Layout = NavbarLayout;

export default SnippetSearchPage;
