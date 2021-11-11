import Link from 'next/link';
import { JsTextOutlined } from '@/components/icons';
import { Card } from '@/components/ui';
import { SearchResponse } from '@/entities/response/base';
import { Snippet } from '@/entities/snippet';
import styles from './style.module.scss';

interface SnippetViewProps {
  snippets: SearchResponse<Snippet>;
}

const SnippetView = ({ snippets }: SnippetViewProps) => (
  <div className='container'>
    {snippets.data.map(snippet => (
      <Card className={styles.snippet}>
        <Card.Meta
          avatar={
            <span className={styles.icon}>
              <JsTextOutlined style={{ fontSize: 26, lineHeight: '48px' }} />
              <i className={styles.expertise} />
            </span>
          }
          title={
            <Link href={`/snippet/${snippet.id}`}>
              <span className={styles.name}>{snippet.name}</span>
            </Link>
          }
          description={snippet.description}
        />
      </Card>
    ))}
  </div>
);

export default SnippetView;
