/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, {
  ChangeEvent,
  Children,
  CSSProperties,
  DetailedReactHTMLElement,
  forwardRef,
  ReactNode,
  TransitionEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTimeout } from '@/hooks';
import guid from '@/utils/guid';
import styles from './style.module.scss';

export function getCount(children: React.ReactChildren) {
  return React.Children.count(
    Array.isArray(children) ? children.filter(child => child) : children
  );
}

interface CarouselProps {
  autoplay?: boolean;
  autoplayInterval?: number;
  style?: CSSProperties;
  children?: ReactNode;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  shape?: 'dot' | 'bar';
  onSelect?: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onSlideStart?: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onSlideEnd?: (index: number, event: TransitionEvent<HTMLDivElement>) => void;
}

const Carousel = forwardRef<any, CarouselProps>((props, ref) => {
  const {
    children,
    className,
    placement = 'bottom',
    shape = 'bar',
    autoplay = true,
    autoplayInterval = 4000,
    onSelect,
    onSlideStart,
    onSlideEnd,
    ...rest
  } = props;

  const count = getCount(children as any);
  const labels: ReactNode[] = [];
  const vertical = placement === 'left' || placement === 'right';
  const lengthKey = vertical ? 'height' : 'width';

  const [activeIndex, setActiveIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const uid = useMemo(() => guid(), []);

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      onSlideEnd?.(activeIndex, event);
    },
    [activeIndex, onSlideEnd]
  );

  const { clear, reset } = useTimeout(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleSlide,
    autoplayInterval,
    !!autoplay && count > 1
  );

  function handleSlide(nextActiveIndex?: number, event?: ChangeEvent<HTMLInputElement>) {
    clear();

    const index = nextActiveIndex ?? activeIndex + 1;

    const nextIndex = index % count;

    setActiveIndex(nextIndex);
    onSlideStart?.(nextIndex, event!);
    setLastIndex(nextActiveIndex == null ? activeIndex : nextIndex);

    reset();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newActiveIndex = +event.target.value;
    handleSlide(newActiveIndex);
    onSelect?.(newActiveIndex, event);
  };

  if (!children) return null;

  const items = Children.map(
    children as any[],
    (child: DetailedReactHTMLElement<any, HTMLElement>, index) => {
      if (!child) {
        return;
      }
      const inputKey = `indicator_${uid}_${index}`;
      labels.push(
        <li key={`label${index}`} className={styles.labelWrapper}>
          <input
            name={inputKey}
            id={inputKey}
            type='radio'
            onChange={handleChange}
            value={index}
            checked={activeIndex === index}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={inputKey} className={styles.label} />
        </li>
      );

      return React.cloneElement(child, {
        key: `slider-item-${index}`,
        'aria-hidden': activeIndex !== index,
        style: { ...child.props.style, [lengthKey]: `${100 / count}%` },
        className: classNames(styles.sliderItem, child.props.className),
      });
    }
  );

  const classString = classNames(
    styles.carousel,
    className,
    styles[`${placement}`],
    styles[`${shape}`]
  );

  const positiveOrder = vertical || true;
  const sign = positiveOrder ? '-' : '';
  const activeRatio = `${sign}${(100 / count) * activeIndex}%`;
  const sliderStyles = {
    [lengthKey]: `${count * 100}%`,
    transform: vertical
      ? `translate3d(0,${activeRatio},0)`
      : `translate3d(${activeRatio},0,0)`,
  };

  const showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;

  if (!items) return null;

  return (
    <div {...rest} ref={ref} className={classString}>
      <div className={styles.content}>
        <div
          className={styles.slider}
          style={sliderStyles}
          onTransitionEnd={handleTransitionEnd}
        >
          {items}
        </div>
        {showMask && (
          <div
            className={classNames(styles.sliderAfter, {
              [styles.sliderAfterVertical]: vertical,
            })}
            style={{ [lengthKey]: '200%' }}
          >
            {[items[items.length - 1], items[0]].map(node =>
              React.cloneElement(node, {
                key: node.key,
                style: { ...node.props.style, [lengthKey]: '50%' },
              })
            )}
          </div>
        )}
      </div>
      <div className={styles.toolbar}>
        <ul>{labels}</ul>
      </div>
    </div>
  );
});

export default Carousel;
