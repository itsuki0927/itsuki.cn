/* eslint-disable no-param-reassign */
import {
  BoldOutlined,
  CodeOutlined,
  EyeOutlined,
  OrderedListOutlined,
  PictureOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { MouseEvent } from 'react';
import styles from './style.module.scss';

type ToolbarProps = {
  onItemClick: (tag: string) => void;
};

const preventDefault = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();

/**
 * NOTE: 直接使用onClick方法, 该元素会获取到焦点, 此时输入框没有焦点, 无法进行正常的插入
 * 所以使用onMouseDown方法阻止默认的获取焦点事件, 或者使用Button也可以实现
 */
const Toolbar = ({ onItemClick }: ToolbarProps) => (
  <div className={styles.toolbar}>
    <div className={styles.action}>
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
      <EyeOutlined
        className={styles.icon}
        onMouseDown={preventDefault}
        onClick={() => onItemClick('preview')}
      />
    </div>
  </div>
);

export default Toolbar;
