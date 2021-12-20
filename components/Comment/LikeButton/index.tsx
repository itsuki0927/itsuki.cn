import classNames from 'classnames';
import React, { cloneElement, isValidElement, ReactNode } from 'react';
import { HeartFilled } from '@/components/icons';
import { IconButton } from '@/components/ui';
import { ButtonProps } from '@/components/ui/Button';
import { useCounter } from '@/hooks';
import styles from './style.module.scss';

type LikeButtonRestProps = Omit<ButtonProps, 'type' | 'onClick' | 'icon' | 'disabled'>;

interface LikeButtonProps {
  type?: ButtonProps['type'];
  isLiked: boolean;
  liking: number;
  onLiked: () => void;
  children?: (props: LikeButtonProps) => ReactNode;
  iconRender?: (props: LikeButtonProps) => ReactNode;
  buttonProps?: LikeButtonRestProps;
}

const defaultIconRender = ({ isLiked }: LikeButtonProps) => (
  <HeartFilled
    className={classNames(styles.liking, {
      [styles.liked]: isLiked,
    })}
  />
);

const LikeButton = (props: LikeButtonProps) => {
  const {
    type = 'ghost',
    isLiked,
    onLiked,
    children,
    buttonProps,
    liking: likingProp,
    iconRender = defaultIconRender,
  } = props;
  const { count: liking, increment } = useCounter(likingProp);
  const iconRenderDom = iconRender({ ...props, liking });
  const iconDom = isValidElement(iconRenderDom)
    ? cloneElement(iconRenderDom, {
        className: classNames(styles.liking, {
          [styles.liked]: isLiked,
        }),
      })
    : '';

  const handleLiked = () => {
    increment();
    onLiked();
  };

  return (
    <IconButton
      type={type}
      disabled={isLiked}
      icon={iconDom}
      onClick={handleLiked}
      {...buttonProps}
    >
      {children?.({ ...props, liking })}
    </IconButton>
  );
};

export default LikeButton;
