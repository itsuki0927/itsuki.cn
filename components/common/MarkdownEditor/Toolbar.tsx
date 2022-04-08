/* eslint-disable no-param-reassign */
import classNames from 'classnames';
import { Button } from '@/components/ui';
import styles from './style.module.scss';

type ToolbarProps = {
  preview?: boolean;
  onPreview?: (preview: boolean) => void;
};

/**
 * NOTE: 直接使用onClick方法, 该元素会获取到焦点, 此时输入框没有焦点, 无法进行正常的插入
 * 所以使用onMouseDown方法阻止默认的获取焦点事件, 或者使用Button也可以实现
 *
 * <Icon onMouseDown={preventDefault} />
 */
const Toolbar = ({ preview, onPreview }: ToolbarProps) => (
  <div className={styles.toolbar}>
    <span className='text-xxs text-gray-3'>{preview ? 'PREVIEW' : 'EDIT'}</span>
    <div className={styles.preview}>
      <Button
        className={classNames(styles.btn, {
          [styles.active]: !preview,
        })}
        size='small'
        onClick={() => {
          onPreview?.(false);
        }}
      >
        编辑
      </Button>
      <Button
        className={classNames(styles.btn, {
          [styles.active]: preview,
        })}
        size='small'
        onClick={() => {
          onPreview?.(true);
        }}
      >
        预览
      </Button>
    </div>
  </div>
);

export default Toolbar;
