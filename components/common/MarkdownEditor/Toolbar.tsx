/* eslint-disable no-param-reassign */
import classNames from 'classnames';
import { MouseEvent } from 'react';
import {
  BoldOutlined,
  CodeOutlined,
  OrderedListOutlined,
  PictureOutlined,
  UnorderedListOutlined,
} from '@/components/icons';
import { Button } from '@/components/ui';
import styles from './style.module.scss';

type ToolbarProps = {
  onItemClick: (tag: string) => void;
  preview?: boolean;
  onPreview?: (preview: boolean) => void;
};

const preventDefault = (e: MouseEvent) => e.preventDefault();

/**
 * NOTE: 直接使用onClick方法, 该元素会获取到焦点, 此时输入框没有焦点, 无法进行正常的插入
 * 所以使用onMouseDown方法阻止默认的获取焦点事件, 或者使用Button也可以实现
 *
 * <Icon onMouseDown={preventDefault} />
 */
const Toolbar = ({ onItemClick, preview, onPreview }: ToolbarProps) => (
  <div className={styles.toolbar}>
    <div
      className={classNames(styles.action, {
        [styles.disabled]: preview,
      })}
    >
      <BoldOutlined
        className={styles.icon}
        onMouseDown={preventDefault}
        onClick={() => onItemClick('bold')}
      />
      <OrderedListOutlined
        className={styles.icon}
        onMouseDown={preventDefault}
        onClick={() => onItemClick('ol')}
      />
      <UnorderedListOutlined
        className={styles.icon}
        onMouseDown={preventDefault}
        onClick={() => onItemClick('ul')}
      />
      <PictureOutlined
        className={styles.icon}
        onMouseDown={preventDefault}
        onClick={() => onItemClick('image')}
      />
      <CodeOutlined
        className={styles.icon}
        onMouseDown={preventDefault}
        onClick={() => onItemClick('bc')}
      />
    </div>
    <div className={styles.preview}>
      <Button
        type='text'
        className={classNames(styles.btn, {
          [styles.active]: !preview,
        })}
        size='small'
        onClick={() => {
          onPreview?.(false);
        }}
      >
        Markdown
      </Button>
      <Button
        type='text'
        className={classNames(styles.btn, {
          [styles.active]: preview,
        })}
        size='small'
        onClick={() => {
          onPreview?.(true);
        }}
      >
        Preview
      </Button>
    </div>
  </div>
);

export default Toolbar;
