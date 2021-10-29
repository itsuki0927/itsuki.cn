import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

interface SkeletonProps {
  show?: boolean;
  // block?: boolean;
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  boxHeight?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  style,
  width,
  height,
  children,
  className,
  show = true,
  boxHeight = height,
}) => {
  // Automatically calculate the size if there are children
  // and no fixed sizes are specified
  const shouldAutoSize = !!children && !(width || height);

  // Defaults
  width = width || 24;
  height = height || 24;
  boxHeight = boxHeight || height;

  return (
    <span
      className={classNames(styles.skeleton, className, {
        [styles.show]: show,
        [styles.wrapper]: shouldAutoSize,
        [styles.loaded]: !shouldAutoSize && !!children,
      })}
      style={
        shouldAutoSize
          ? {}
          : {
              minWidth: width,
              minHeight: height,
              marginBottom: `calc(${boxHeight} - ${height})`,
              ...style,
            }
      }
    >
      {children}
    </span>
  );
};

export default Skeleton;
