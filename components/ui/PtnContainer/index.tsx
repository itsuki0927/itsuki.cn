'use client';

import classNames from 'classnames';
import { WithAsProps } from '@/types/common';
import styles from './index.module.scss';

export type PtnContainerProps = WithAsProps;

const PtnContainer = ({
  className = '',
  as: Component = 'div',
  ...rest
}: PtnContainerProps) => (
  <Component className={classNames(styles.ptn, className)} {...rest} />
);

export default PtnContainer;
