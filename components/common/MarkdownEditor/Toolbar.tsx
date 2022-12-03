import classNames from 'classnames';
import { ReactNode } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

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
  <div className='flex justify-between bg-gray-100 leading-9'>
    <div className='flex'>
      <button
        aria-label='preview markdown'
        type='button'
        className={classNames(
          'px-3 text-xxs text-gray-500 hover:bg-gray-200 hover:text-gray-600'
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
          />
        </SwitchTransition>
      </button>
    </div>

    {children}
  </div>
);

export default Toolbar;
