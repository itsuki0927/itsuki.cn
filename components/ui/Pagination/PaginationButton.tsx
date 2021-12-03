import classNames from 'classnames';
import {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
} from 'react';
import { Button } from '..';
import styles from './style.module.scss';

export interface PaginationButtonProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  eventKey?: number | string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  onSelect?: (eventKey: any, event: MouseEvent) => void;
}
const PaginationButton = (props: PropsWithChildren<PaginationButtonProps>) => {
  const {
    active,
    disabled,
    className,
    children,
    eventKey,
    style,
    onSelect,
    onClick,
    ...rest
  } = props;

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (disabled) return;
      onSelect?.(eventKey!, event);
    },
    [disabled, eventKey, onSelect]
  );

  return (
    <Button
      {...rest}
      disabled={disabled}
      onClick={e => {
        handleClick(e);
      }}
      className={classNames({
        [styles.active]: active,
        className,
      })}
      style={style}
    >
      {children}
    </Button>
  );
};

export default PaginationButton;
