import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import { getExpandsValue } from '@/transformers/expands';
import styles from './style.module.scss';

interface SnippetBannerProps {
  className?: string;
  name: string;
  description: string;
  path: string;
  expand?: string;
  disabledLink?: boolean;
}

export type SnippetBannerExpands = {
  icon: string;
  color: string;
  background: string;
};

const SnippetBanner = ({
  name,
  description,
  path,
  expand,
  className,
  disabledLink = false,
}: SnippetBannerProps) => {
  const { icon, ...iconStyles } = getExpandsValue<SnippetBannerExpands>(expand);

  return (
    <Card className={classNames(styles.snippetBanner, className)}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon className={styles.icon} name={icon} style={{ ...iconStyles }} />
        <div className={styles.content}>
          {disabledLink ? (
            <h2 className={classNames(styles.name, styles.disabled)}>{name}</h2>
          ) : (
            <Link href={path}>
              <h2 className={styles.name}>{name}</h2>
            </Link>
          )}
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Card>
  );
};
export default SnippetBanner;
