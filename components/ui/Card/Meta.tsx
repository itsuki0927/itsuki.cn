import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';
import styles from './style.module.scss';

export interface CardMetaProps {
  style?: CSSProperties;
  className?: string;
  avatar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

const Meta: FC<CardMetaProps> = ({ avatar, title, description, className, style }) => {
  const avatarDom = avatar ? <div className={styles.avatar}>{avatar}</div> : null;
  const titleDom = title ? <div className={styles.title}>{title}</div> : null;
  const descriptionDom = description ? (
    <div className={styles.description}>{description}</div>
  ) : null;

  const metaDetail =
    titleDom || descriptionDom ? (
      <div className={styles.detail}>
        {titleDom}
        {descriptionDom}
      </div>
    ) : null;

  return (
    <div className={classNames(styles.meta, className)} style={style}>
      {avatarDom}
      {metaDetail}
    </div>
  );
};

export default Meta;
