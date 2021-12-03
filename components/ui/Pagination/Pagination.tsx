import { CSSProperties, ReactNode, useCallback } from 'react';
import {
  DoubleLeftOutline,
  DoubleRightOutline,
  LeftOutlined,
  RightOutlined,
} from '@/components/icons';
import PaginationButton, { PaginationButtonProps } from './PaginationButton';

export type PaginationProps = {
  first?: boolean | ReactNode;
  prev?: boolean | ReactNode;
  next?: boolean | ReactNode;
  last?: boolean | ReactNode;
  disabled?: boolean | ((eventKey: number | string) => boolean);
  current?: number;
  onChange?: (current: number) => void;
  className?: string;
  pages?: number;
  style?: CSSProperties;
};

const Pagination = ({
  current = 1,
  onChange,
  disabled: disabledProp,
  first,
  prev,
  next,
  last,
  className,
  pages = 1,
  ...rest
}: PaginationProps) => {
  const renderItem = useCallback(
    (key: string | number, itemProps: PaginationButtonProps) => {
      const { eventKey, disabled, ...itemRest } = itemProps;

      let disabledItem = disabled;

      if (typeof disabledProp !== 'undefined') {
        disabledItem =
          typeof disabledProp === 'function' ? disabledProp(eventKey!) : disabledProp;
      }

      const keyString = `${key}-${eventKey}`;

      return (
        <PaginationButton
          aria-label={keyString}
          title={keyString}
          {...itemRest}
          key={keyString}
          eventKey={eventKey}
          disabled={disabledItem}
          onSelect={disabledItem ? undefined : onChange}
        />
      );
    },
    [disabledProp, onChange]
  );

  const renderFirst = () => {
    if (!first) return null;

    return renderItem('first', {
      eventKey: 1,
      disabled: current === 1,
      children: <span>{first === true ? <DoubleLeftOutline /> : first}</span>,
    });
  };

  const renderPrev = () => {
    if (!prev) return null;

    return renderItem('prev', {
      eventKey: current - 1,
      disabled: current === 1,
      children: <span>{prev === true ? <LeftOutlined /> : prev}</span>,
    });
  };

  const renderPageButtons = () => {
    const pageButtons = Array.from({ length: pages }, (_, index) => {
      const pageIdx = index + 1;
      return renderItem(pageIdx, {
        eventKey: pageIdx,
        active: pageIdx === current,
        children: pageIdx,
      });
    });
    return pageButtons;
  };

  const renderNext = () => {
    if (!next) return null;

    return renderItem('next', {
      eventKey: current + 1,
      disabled: current >= pages,
      children: <span>{next === true ? <RightOutlined /> : next}</span>,
    });
  };

  const renderLast = () => {
    if (!last) return null;

    return renderItem('last', {
      eventKey: pages,
      disabled: current >= pages,
      children: <span>{last === true ? <DoubleRightOutline /> : last}</span>,
    });
  };

  return (
    <div className={className} {...rest}>
      {renderFirst()}
      {renderPrev()}
      {renderPageButtons()}
      {renderNext()}
      {renderLast()}
    </div>
  );
};

export default Pagination;
