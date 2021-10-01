import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';
import Meta from './Meta';

const getActions = (actions: ReactNode[]) =>
  actions.map((action, index) => (
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
  id,
  size,
  type,
  cover,
  actions,
  title,
  extra,
  hoverable,
  headStyle = {},
  bodyStyle = {},
  bordered = true,
  loading,
  children,
  ...otherProps
}) => {
  const loadingBlockStyle =
    bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined;

  const block = <div className='card-loading-block'></div>;

  const loadingBlock = <div style={loadingBlockStyle}>{block}</div>;

  let head: ReactNode;

  if (title || extra) {
    head = (
      <div className='card-head' style={headStyle}>
        <div className='card-head-wrapper'>
          {title && <div className='card-head-title'>{title}</div>}
          {extra && <div className='card-head-extra'>{extra}</div>}
        </div>
      </div>
    );
  }

  const coverDom = cover ? <div className='card-cover'>{cover}</div> : null;

  const body = (
    <div className='card-body' style={bodyStyle}>
      {loading ? loadingBlock : children}
    </div>
  );

  const actionDom =
    actions && actions.length ? <ul className='card-actions'>{getActions(actions)}</ul> : null;

  const classString = classNames(
    'card',
    {
      'card-bordered': bordered,
      'card-loading': loading,
      'card-hoverable': hoverable,
      [`card-${size}`]: size,
      [`card-type-${type}`]: type,
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
