import { useControlled } from '@/hooks/index';
import Pagination, { PaginationProps } from './Pagination';

export interface PaginationGroupProps extends PaginationProps {
  pageSize?: number;
  defaultPageSize?: number;
  defaultCurrent?: number;
  total: number;
}

const PaginationGroup = ({
  total,
  className,
  onChange,
  pageSize: pageSizeProp = 20,
  current: currentProp,
  disabled,
  defaultCurrent,
  defaultPageSize,
  prev = true,
  next = true,
  ...rest
}: PaginationGroupProps) => {
  const [pageSize] = useControlled(pageSizeProp!, defaultPageSize || 8);
  const [current, setCurrent] = useControlled(currentProp, defaultCurrent || 1);
  const pages = Math.floor(total / pageSize) + (total % pageSize ? 1 : 0);

  const handleChange = (newCurrent: number) => {
    setCurrent(newCurrent);
    onChange?.(newCurrent);
  };

  return (
    <Pagination
      {...rest}
      prev={prev}
      next={next}
      pages={pages}
      className={className}
      onChange={handleChange}
      disabled={disabled}
      current={current}
    />
  );
};

export default PaginationGroup;
