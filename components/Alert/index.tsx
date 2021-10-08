import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
import classNames from 'classnames';
import {
  cloneElement,
  createElement,
  CSSProperties,
  isValidElement,
  MouseEventHandler,
  ReactNode,
} from 'react';

type AnyObject = Record<any, any>;

type RenderProps =
  | undefined
  | AnyObject
  | ((originProps: AnyObject) => AnyObject | undefined);

/**
 * 替换元素
 *
 * @param element 元素
 * @param replacement 替换元素
 * @param props 额外props
 * @returns 新元素
 */
export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props: RenderProps
): React.ReactNode {
  if (!isValidElement(element)) return replacement;

  return cloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props
  );
}

const iconMapFilled = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

const iconMapOutlined = {
  success: CheckCircleOutlined,
  info: InfoCircleOutlined,
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
};

export type AlertProps = {
  type?: 'success' | 'info' | 'warning' | 'error';
  message?: ReactNode;
  description?: ReactNode;
  showIcon?: boolean;
  role?: string;
  style?: CSSProperties;
  className?: string;
  banner?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const Alert = ({
  description,
  message,
  banner,
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
  showIcon,
  action,
  ...otherProps
}: AlertProps) => {
  const getType = () => {
    const { type } = otherProps;
    if (type !== undefined) {
      return type;
    }
    return banner ? 'warning' : 'info';
  };

  const type = getType();

  const renderIconType = () => {
    const { icon } = otherProps;
    const iconType = (description ? iconMapOutlined : iconMapFilled)[type] || null;

    if (icon) {
      return replaceElement(icon, <span className='alert-icon'>{icon}</span>, () => ({
        className: classNames('alert-icon', {
          [(icon as any).props.className]: (icon as any).props.className,
        }),
      }));
    }
    return createElement(iconType, { className: 'alert-icon' });
  };

  const isShowIcon = banner && showIcon === undefined ? true : showIcon;

  const classString = classNames(
    'alert',
    `alert-${type}`,
    {
      'alert-with-description': !!description,
      'alert-no-icon': !isShowIcon,
      'alert-banner': !!banner,
    },
    className
  );

  return (
    <div
      className={classString}
      style={{ ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      role='alert'
      aria-hidden='true'
    >
      {isShowIcon ? renderIconType() : null}
      <div className='alert-content'>
        {message ? <div className='alert-message'>{message}</div> : null}
        {description ? <div className='alert-description'>{description}</div> : null}
      </div>
      {action ? <div className='alert-action'>{action}</div> : null}
    </div>
  );
};

export default Alert;
