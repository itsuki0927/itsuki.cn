import classNames from 'classnames';
import { FC } from 'react';
import styles from './style.module.css';

export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

export type SizeType = 'small' | 'default' | 'large';

export type ButtonType = 'primary' | 'ghost' | 'reverse';

type BaseButtonProps = {
  type?: ButtonType;
  size?: SizeType;
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

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button: FC<ButtonProps> = ({
  size = 'default',
  type = 'primary',
  loading,
  className,
  block = false,
  children,
  onClick,
  ...rest
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    if (loading || rest.disabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  const classString = classNames(
    styles.btn,
    {
      [styles.small]: size === 'small',
      [styles.large]: size === 'large',
      [styles.block]: block,
      [styles.ghost]: type === 'ghost',
      [styles.reverse]: type === 'reverse',
      [styles.primary]: type === 'primary',
      [styles.disabled]: rest.disabled,
    },
    className
  );

  return (
    <button type='button' className={classString} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
