import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import { getExpandsValue } from '@/transformers/expands';
import styles from './style.module.scss';

interface SnippetBannerProps {
  className?: string;
  description: string;
  expand?: string;
  children?: ReactNode;
}

export type SnippetBannerExpands = {
  icon: string;
  color: string;
  background: string;
};

interface SnippetBannerTitleProps {
  name: string;
  className?: string;
}

export const SnippetBannerTitle = ({ name, className }: SnippetBannerTitleProps) => (
  <h2 className={classNames(styles.name, className)}>{name}</h2>
);

const SnippetBanner = ({
  description,
  expand,
  className,
  children,
}: SnippetBannerProps) => {
  const { icon, ...iconStyles } = getExpandsValue<SnippetBannerExpands>(expand);

  return (
    <Card className={classNames(styles.snippetBanner, className)}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon className={styles.icon} name={icon} style={iconStyles} />
        <div className={styles.content}>
          {children}
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Card>
  );
};
export default SnippetBanner;
