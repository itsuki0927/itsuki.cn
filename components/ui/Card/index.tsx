import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import Meta from './Meta';
import styles from './style.module.scss';

const getActions = (actions: ReactNode[]) =>
  actions.map((action, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
      <span>{action}</span>
    </li>
  ));

export type CardType = 'inner';
export type CardSize = 'default' | 'small';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  extra?: ReactNode;
  bordered?: boolean;
  headStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  style?: CSSProperties;
  loading?: boolean;
  hoverable?: boolean;
  id?: string;
  className?: string;
  size?: CardSize;
  type?: CardType;
  cover?: ReactNode;
  actions?: ReactNode[];
}

export interface CardInterface extends React.FC<CardProps> {
  Meta: typeof Meta;
}

const Card: CardInterface = ({
  className,
  size = 'default',
  type,
  cover,
  actions,
  title,
  extra,
  hoverable,
  headStyle = {},
  bodyStyle = {},
  bordered = false,
  loading,
  children,
  ...otherProps
}) => {
  const loadingBlockStyle =
    bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined;

  const block = <div className={styles.loadingBlock} />;

  const loadingBlock = <div style={loadingBlockStyle}>{block}</div>;

  let head: ReactNode;

  if (title || extra) {
    head = (
      <div className={styles.head} style={headStyle}>
        <div className={styles.wrapper}>
          {title && <div className={styles.title}>{title}</div>}
          {extra && <div className={styles.extra}>{extra}</div>}
        </div>
      </div>
    );
  }

  const coverDom = cover ? <div className={styles.cover}>{cover}</div> : null;

  const body = (
    <div className={styles.body} style={bodyStyle}>
      {loading ? loadingBlock : children}
    </div>
  );

  const actionDom =
    actions && actions.length ? (
      <ul className={styles.actions}>{getActions(actions)}</ul>
    ) : null;

  const classString = classNames(
    styles.card,
    {
      [styles.bordered]: bordered,
      [styles.loading]: loading,
      [styles.hoverable]: hoverable,
      [styles[size]]: !!size,
      [styles.typeInner]: !!type,
    },
    className
  );

  return (
    <div {...otherProps} className={classString}>
      {head}
      {coverDom}
      {body}
      {actionDom}
    </div>
  );
};

Card.Meta = Meta;

export default Card;
