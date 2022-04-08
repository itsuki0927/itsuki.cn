import classNames from 'classnames';
import { FC } from 'react';

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
    {
      'py-2 px-4 text-xxs': size === 'small',
      'py-2 px-6 text-sm': size === 'large',
      'w-full': block,
      'border border-solid border-gray-3 text-gray-3 hover:border-dark-2 hover:bg-dark-2 hover:text-white dark:border-gray-3--dark dark:text-gray-3--dark':
        type === 'ghost',
      'border border-solid border-gray-3 bg-dark-2 text-white hover:bg-gray-3 dark:border-gray-3--dark dark:bg-dark-2--dark dark:text-white--dark':
        type === 'reverse',
      'bg-white text-gray-3 hover:bg-dark-2 hover:text-white dark:bg-white--dark dark:text-gray-3--dark':
        type === 'primary',
      'bg:border-white-3--dark pointer-events-none cursor-not-allowed border-white-3 bg-white-3 shadow-none dark:bg-white-3--dark':
        rest.disabled,
    },
    'inline-block cursor-pointer touch-manipulation text-center text-xs tracking-wider transition-all duration-500',
    className
  );

  return (
    <button type='button' className={classString} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
