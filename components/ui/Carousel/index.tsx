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

  const classString = classNames(
    'relative overflow-hidden bg-white dark:bg-white--dark',
    className
  );

  const placementMap = {
    top: 'top-4',
    left: 'left-4',
    right: 'right-4',
    bottom: 'bottom-4',
  } as const;

  const toolbarCls = classNames(
    'absolute flex items-center justify-center',
    {
      'left-0 w-full right-0': placement === 'top' || placement === 'bottom',
      'top-0 h-full w-3': placement === 'left' || placement === 'right',
    },
    placementMap[placement]
  );

  const toolbarUlCls = classNames('m-0 flex list-inside p-0', {
    'items-center justify-center': placement === 'top' || placement === 'bottom',
    'flex-col items-center justify-center': placement === 'left' || placement === 'right',
  });

  const labelCls = classNames(
    'relative block cursor-pointer bg-gray-1 transition-all after:absolute after:-top-1 after:-right-1 after:-bottom-1 after:-left-1 after:content-[""] hover:bg-white-1 dark:bg-gray-1--dark hover:dark:bg-white-1--dark',
    {
      'h-3 w-3 rounded-full': shape === 'dot',
      'rounded-sm': shape === 'bar',
      'h-1 w-4': placement === 'top' || placement === 'bottom',
      'h-4 w-1': placement === 'left' || placement === 'right',
    }
  );

  const items = Children.map(
    children as any[],
    (child: DetailedReactHTMLElement<any, HTMLElement>, index) => {
      if (!child) {
        return;
      }
      const inputKey = `indicator_${uid}_${index}`;
      labels.push(
        <li key={`label${index}`} className='m-1'>
          <input
            name={inputKey}
            id={inputKey}
            type='radio'
            onChange={handleChange}
            value={index}
            className='absolute h-0 w-0 opacity-0'
            checked={activeIndex === index}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={inputKey} className={labelCls} />
        </li>
      );

      return React.cloneElement(child, {
        key: `slider-item-${index}`,
        'aria-hidden': activeIndex !== index,
        style: { ...child.props.style, [lengthKey]: `${100 / count}%` },
        className: classNames(
          'float-left h-full w-full bg-white dark:bg-white--dark',
          child.props.className
        ),
      });
    }
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
      <div className='relative h-full w-full overflow-hidden'>
        <div
          className='relative left-0 h-full transition-transform will-change-transform'
          style={sliderStyles}
          onTransitionEnd={handleTransitionEnd}
        >
          {items}
        </div>
        {showMask && (
          <div
            className={classNames(
              'absolute left-0 top-0 h-full w-full bg-white dark:bg-white--dark',
              vertical ? 'animate-move-left-half' : 'animate-move-left-half-vertical'
            )}
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
      <div className={toolbarCls}>
        <ul className={toolbarUlCls}>{labels}</ul>
      </div>
    </div>
  );
});

export default Carousel;
