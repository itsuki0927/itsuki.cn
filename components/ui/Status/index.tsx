import classNames from 'classnames';
import { FunctionComponent, ReactNode } from 'react';
import { StandardProps } from '@/types/common';

interface StatusProps extends StandardProps {
  icon?: ReactNode;
  title?: ReactNode;
  description: ReactNode;
}

interface StatusButtonProps extends StandardProps {
  onClick?: () => void;
}

const StatusButton = ({
  onClick,
  style,
  children,
  className = '',
}: StatusButtonProps) => (
  <button
    className={classNames(
      'flex items-center rounded-sm px-4 py-2 text-sm transition-colors',
      'bg-primary text-white hover:bg-primary-hover',
      className
    )}
    type='button'
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

export type StatusComponent = FunctionComponent<StatusProps> & {
  Button: typeof StatusButton;
};

const Status: StatusComponent = ({
  icon,
  title,
  className = '',
  description,
  children,
}: StatusProps) => (
  <div className={classNames('bg-gray-50 p-4 sm:p-6', className)}>
    {icon}

    <div className='mt-2 text-xl font-medium text-gray-900'>{title}</div>
    <div className='text-gray-600 '>{description}</div>

    {children}
  </div>
);

Status.Button = StatusButton;

export default Status;
