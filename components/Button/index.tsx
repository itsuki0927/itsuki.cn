import classNames from 'classnames';
import { FC, ReactNode } from 'react';

export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

export type SizeType = 'small' | 'default' | 'large';

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';

type BaseButtonProps = {
  type?: ButtonType;
  size?: SizeType;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  block?: boolean;
};
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button: FC<ButtonProps> = ({
  size = 'default',
  type = 'default',
  icon,
  loading,
  className,
  block = false,
  children,
  onClick,
  ...otherProps
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (loading || otherProps.disabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  const classString = classNames(
    {
      [`btn-${size}`]: size,
      [`btn-${type}`]: type,
      'btn-block': block,
    },
    'btn',
    className
  );
  return (
    <button className={classString} onClick={handleClick} {...otherProps}>
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
