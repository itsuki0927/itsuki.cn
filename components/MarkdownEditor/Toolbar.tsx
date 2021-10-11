/* eslint-disable no-param-reassign */
import {
  BoldOutlined,
  CodeOutlined,
  OrderedListOutlined,
  PictureOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';
import Button from '../Button';
import styles from './style.module.scss';

type ToolbarProps = {
  onItemClick: (tag: string) => void;
  preview?: boolean;
  onPreview?: (preview: boolean) => void;
};

const preventDefault = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();

/**
 * NOTE: 直接使用onClick方法, 该元素会获取到焦点, 此时输入框没有焦点, 无法进行正常的插入
 * 所以使用onMouseDown方法阻止默认的获取焦点事件, 或者使用Button也可以实现
 *
 * <Icon onMouseDown={preventDefault} />
 */
const Toolbar = ({ onItemClick, preview: previewProp, onPreview }: ToolbarProps) => {
  const [preview, setPreview] = useState(previewProp);

  useEffect(() => {
    if (previewProp !== preview) {
      setPreview(previewProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewProp]);

  return (
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
            setPreview(false);
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
            setPreview(true);
            onPreview?.(true);
          }}
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
