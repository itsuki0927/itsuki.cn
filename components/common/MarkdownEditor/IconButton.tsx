import classNames from 'classnames';
import { ReactNode, MouseEvent } from 'react';

interface IconButtonProps {
  children?: ReactNode;
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

const IconButton = ({ children, onClick, className }: IconButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className={classNames('text-xxs text-gray-500 hover:text-gray-600', className)}
  >
    {children}
  </button>
);

export default IconButton;
