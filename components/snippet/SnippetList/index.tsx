import { useRouter } from 'next/router';
import { Empty, Pagination } from '@/components/ui';
import { SearchResponse } from '@/types/response';
import { Snippet } from '@/entities/snippet';
import { SnippetCard } from '..';

interface SnippetListProps {
  snippets: SearchResponse<Snippet>;
}

const SnippetList = ({ snippets }: SnippetListProps) => {
  const router = useRouter();
  const current = Number(router.asPath.slice(-1));

  if (!snippets.total) {
    return <Empty />;
  }

  return (
    <>
      {snippets.data.map(snippet => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}

      <div style={{ textAlign: 'center' }}>
        <Pagination
          total={snippets.total}
          pageSize={15}
          current={current}
          onChange={newCurrent => {
            router.push(router.asPath.slice(0, -1) + newCurrent);
          }}
        />
      </div>
    </>
  );
};

export default SnippetList;
