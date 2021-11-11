import classNames from 'classnames';
import Link from 'next/link';
import React, { CSSProperties } from 'react';
import styles from './style.module.scss';

interface BreadcrumbItemProps {
  active?: boolean;

  href?: string;

  title?: string;

  target?: string;

  className?: string;

  style?: CSSProperties;
}
const BreadcrumbItem = ({
  active,
  href,
  title,
  target,
  className,
  style,
}: BreadcrumbItemProps) => {
  if (active) {
    return (
      <span style={style} className={classNames(styles.link, styles.active, className)}>
        {title}
      </span>
    );
  }

  return (
    <Link href={href ?? ''}>
      <a
        href={href}
        className={classNames(styles.link, className)}
        style={style}
        target={target}
      >
        {title}
      </a>
    </Link>
  );
};

export default BreadcrumbItem;
