import React, { ReactNode } from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import styles from './style.module.scss';

interface BreadcrumbProps {
  breadcrumbs: { url: string; name: string }[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbProps) => {
  const items: ReactNode[] = [];

  const count = breadcrumbs.length;

  if (count) {
    breadcrumbs.forEach((item, index) => {
      items.push(
        <li key={item.url}>
          <BreadcrumbItem
            active={index === count - 1}
            title={item.name}
            href={item.url}
          />
        </li>
      );
      if (index < count - 1) {
        items.push(
          <span aria-hidden className={styles.separator}>
            /
          </span>
        );
      }
    });
  }

  return (
    <nav aria-label='breadcrumbs' className={styles.breadcrumbs}>
      <ol className={styles.list}>{items}</ol>
    </nav>
  );
};

export default Breadcrumbs;
