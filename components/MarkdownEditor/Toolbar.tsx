/* eslint-disable no-param-reassign */
import {
  BoldOutlined,
  CodeOutlined,
  EyeOutlined,
  OrderedListOutlined,
  PictureOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import React from 'react';
import styles from './style.module.scss';

type ToolbarProps = {
  onItemClick: (tag: string) => void;
};
const Toolbar = ({ onItemClick }: ToolbarProps) => (
  <div className={styles.toolbar}>
    <div className={styles.action}>
      <BoldOutlined className={styles.icon} onClick={() => onItemClick('bold')} />
      <OrderedListOutlined className={styles.icon} onClick={() => onItemClick('ol')} />
      <UnorderedListOutlined className={styles.icon} onClick={() => onItemClick('ul')} />
      <PictureOutlined className={styles.icon} onClick={() => onItemClick('image')} />
      <CodeOutlined className={styles.icon} onClick={() => onItemClick('bc')} />
      <EyeOutlined
        className={styles.icon}
        onClick={() => {
          onItemClick('preview');
        }}
      />
    </div>
  </div>
);

export default Toolbar;
