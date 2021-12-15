import Link from 'next/link';
import { SnippetExpertise } from '@/components/snippet';
import { Card } from '@/components/ui';
import styles from './style.module.scss';

const Snippet = () => (
  <Card>
    <div className={styles.snippet}>
      <Link href='https://itsuki.cn/snippet/js/s/35'>
        <span className={styles.name}>unzipWith</span>
      </Link>
      <SnippetExpertise ranks={2} />
    </div>
  </Card>
);

export default Snippet;
