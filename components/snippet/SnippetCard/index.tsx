import classNames from 'classnames';
import Link from 'next/link';
import { JsTextOutlined } from '@/components/icons';
import { Card } from '@/components/ui';
import { Snippet } from '@/entities/snippet';
import styles from './style.module.scss';

export enum RanksState {
  Easy = 0, // 简单
  Medium = 1, // 中等
  Hard = 2, // 困难
}
interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard = ({ snippet }: SnippetCardProps) => (
  <Card className={styles.snippet}>
    <Card.Meta
      avatar={
        <span className={styles.icon}>
          <JsTextOutlined style={{ fontSize: 26, lineHeight: '48px' }} />
          <i
            className={classNames(styles.expertise, {
              [styles.easy]: snippet.ranks === RanksState.Easy,
              [styles.medium]: snippet.ranks === RanksState.Medium,
              [styles.hard]: snippet.ranks === RanksState.Hard,
            })}
          />
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
);

export default SnippetCard;
