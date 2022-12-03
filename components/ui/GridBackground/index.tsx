import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './style.module.scss';

export interface GridBackgroundProps {
  border?: boolean;
  children?: ReactNode;
  className?: string;
}

const GridBackground = ({ children, className, border = true }: GridBackgroundProps) => (
  <motion.div
    /* variants={{ */
    /*   noOverflow: { */
    /*     true: { */
    /*       overflow: 'hidden', */
    /*     }, */
    /*   }, */
    /* }} */
    className={classNames(styles.grid, className, border && styles.hasBorder)}
  >
    {children}
  </motion.div>
);

export default GridBackground;
