import { Empty } from '@/components/ui';
import { SearchResponse } from '@/types/response';
import { Snippet } from '@/entities/snippet';
import { SnippetCard } from '..';

interface SnippetListProps {
  snippets: SearchResponse<Snippet>;
}

const SnippetList = ({ snippets }: SnippetListProps) => {
  if (!snippets.total) {
    return <Empty />;
  }

  return (
    <>
      {snippets.data.map(snippet => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </>
  );
};

export default SnippetList;
