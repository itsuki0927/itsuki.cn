import classNames from 'classnames';
import {
  cloneElement,
  createElement,
  CSSProperties,
  isValidElement,
  MouseEventHandler,
  ReactNode,
} from 'react';
import {
  InfoCircleOutlined,
  InfoCircleFilled,
  ExclamationCircleOutlined,
  ExclamationCircleFilled,
  CloseCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CheckCircleOutlined,
} from '@/components/icons';
import styles from './style.module.scss';

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
  icon?: ReactNode;
  action?: ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const Alert = ({
  description,
  message,
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
    return 'info';
  };

  const type = getType();

  const renderIconType = () => {
    const { icon } = otherProps;
    const iconType = (description ? iconMapOutlined : iconMapFilled)[type] || null;

    if (icon) {
      return replaceElement(icon, <span className={styles.icon}>{icon}</span>, () => ({
        className: classNames(styles.icon, {
          [(icon as any).props.className]: (icon as any).props.className,
        }),
      }));
    }
    return createElement(iconType, { className: styles.icon });
  };

  const isShowIcon = showIcon === undefined ? true : showIcon;

  const classString = classNames(
    styles.alert,
    styles[type],
    {
      [styles.withDescription]: !!description,
      [styles.noIcon]: !isShowIcon,
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
      <div className={styles.content}>
        {message ? <div className={styles.message}>{message}</div> : null}
        {description ? <div className={styles.description}>{description}</div> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
};

export default Alert;
