import classNames from 'classnames';
import { ReactNode } from 'react';
import { Button } from '..';
import { ButtonProps } from '../Button';
import styles from './style.module.scss';

export interface IconButtonProps extends ButtonProps {
  icon?: ReactNode;
}
const IconButton = ({ icon, children, className, ...rest }: IconButtonProps) => {
  const classString = classNames(styles.iconBtn, className);

  return (
    <Button {...rest} className={classString}>
      {icon}
      {children}
    </Button>
  );
};

export default IconButton;
