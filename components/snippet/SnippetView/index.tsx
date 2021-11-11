import router from 'next/router';
import { Card, Input } from '@/components/ui';
import { SearchResponse } from '@/entities/response/base';
import { Snippet } from '@/entities/snippet';
import SnippetCard from '../SnippetCard';

interface SnippetViewProps {
  snippets: SearchResponse<Snippet>;
}

const SnippetView = ({ snippets }: SnippetViewProps) => (
  <div className='container'>
    <Card style={{ marginBottom: 24 }}>
      <Input
        size='lg'
        placeholder='Search Code'
        onPressEnter={e => {
          router.push(`/snippet/search?keyword=${e.currentTarget.value}`);
        }}
      />
    </Card>

    {snippets.data.map(snippet => (
      <SnippetCard snippet={snippet} key={snippet.id} />
    ))}
  </div>
);

export default SnippetView;
