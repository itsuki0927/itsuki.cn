import classNames from 'classnames';
import { CSSProperties } from 'react';
import styles from './icon.module.scss';

// type IconProps = React.RefAttributes<HTMLSpanElement> & {
type IconProps = React.AllHTMLAttributes<HTMLSpanElement> & {
  style?: CSSProperties;
  className?: string;
  name: string;
};

export type IconRestProps = Omit<IconProps, 'name'>;

const Icon = ({ name, className, style, ...rest }: IconProps) => {
  const classString = classNames(styles.icon, {
    [`${className}`]: className,
  });
  const iconClassString = classNames('iconfont', {
    [`icon-${name}`]: name,
  });

  return (
    <span className={classString} style={style} {...rest}>
      <i className={iconClassString} />
    </span>
  );
};

export default Icon;
