import classNames from 'classnames';
import { CSSProperties, FC, ReactNode } from 'react';

export interface CardMetaProps {
  style?: CSSProperties;
  className?: string;
  avatar?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

const Meta: FC<CardMetaProps> = ({ avatar, title, description, className, style }) => {
  const avatarDom = avatar ? <div className='card-meta-avatar'>{avatar}</div> : null;
  const titleDom = title ? <div className='card-meta-title'>{title}</div> : null;
  const descriptionDom = description ? (
    <div className='card-meta-description'>{description}</div>
  ) : null;

  const metaDetail =
    titleDom || descriptionDom ? (
      <div className='card-meta-detail'>
        {titleDom}
        {descriptionDom}
      </div>
    ) : null;

  return (
    <div className={classNames('card-meta', className)} style={style}>
      {avatarDom}
      {metaDetail}
    </div>
  );
};

export default Meta;
