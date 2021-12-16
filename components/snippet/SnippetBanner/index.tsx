import classNames from 'classnames';
import React, { ForwardedRef, forwardRef, MouseEvent, ReactNode } from 'react';
import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import { getExpandsValue } from '@/utils';
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
  onClick?: (e: MouseEvent<HTMLHeadingElement>) => void;
}

export const SnippetBannerTitle = forwardRef(
  (
    { name, className, onClick }: SnippetBannerTitleProps,
    ref: ForwardedRef<HTMLHeadingElement>
  ) => (
    <h2 className={classNames(styles.name, className)} ref={ref} onClick={onClick}>
      {name}
    </h2>
  )
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
      <div className={styles.wrapper}>
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
