import classNames from 'classnames';
import { CSSProperties, forwardRef } from 'react';
import styles from './style.module.scss';

const presetColors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';

export interface TagProps {
  size?: 'lg' | 'md' | 'sm';
  color?: Color | string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const isPresetColor = (color?: string) => {
  if (!color) return false;

  return presetColors.includes(color);
};

const Tag = forwardRef<any, TagProps>(
  ({ size = 'md', color, children, className, style }, ref) => {
    const isPreset = isPresetColor(color);

    const tagStyle =
      color && !isPreset
        ? {
            backgroundColor: color,
            borderColor: color,
            color: '#fff',
            ...style,
          }
        : style;

    const classString = classNames(
      styles.tag,
      isPreset && styles[color!],
      styles[size],
      className
    );

    return (
      <div style={tagStyle} ref={ref} className={classString}>
        <span className={styles.text}>{children}</span>
      </div>
    );
  }
);
export default Tag;
