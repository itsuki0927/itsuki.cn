/* eslint-disable no-param-reassign */
import classNames from 'classnames';
import { ReactNode } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { EyeCloseFilled, EyeFilled } from '@/components/icons';

type ToolbarProps = {
  preview?: boolean;
  onPreview?: (preview: boolean) => void;
  children?: ReactNode;
};

/**
 * NOTE: 直接使用onClick方法, 该元素会获取到焦点, 此时输入框没有焦点, 无法进行正常的插入
 * 所以使用onMouseDown方法阻止默认的获取焦点事件, 或者使用Button也可以实现
 *
 * <Icon onMouseDown={preventDefault} />
 */
const Toolbar = ({ preview, onPreview, children }: ToolbarProps) => (
  <div className='flex justify-between bg-white-2 leading-normal '>
    <button
      type='button'
      className={classNames(
        'px-3 text-xxs text-gray-3 hover:bg-white-3 hover:text-dark-1'
      )}
      onClick={() => {
        onPreview?.(!preview);
      }}
    >
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={preview ? 'preview' : 'edit'}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames='move'
        >
          {preview ? <EyeCloseFilled key='edit' /> : <EyeFilled key='preview' />}
        </CSSTransition>
      </SwitchTransition>
    </button>

    {children}
  </div>
);

export default Toolbar;
