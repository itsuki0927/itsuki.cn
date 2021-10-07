import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Button from '../Button';
import styles from './style.module.scss';

export type PaginationProps = {
  total: number;
  current?: number;
  pageSize?: number;
  defaultPageSize?: number;
  defaultCurrent?: number;
  onChange?: (current: number, pageSize: number) => void;
};

const Pagination = ({
  total,
  current: currentProp,
  pageSize: pageSizeProp,
  defaultCurrent = 1,
  defaultPageSize = 20,
  onChange,
}: PaginationProps) => {
  const [current, setCurrent] = useState(currentProp || defaultCurrent);
  const [pageSize, setPageSize] = useState(pageSizeProp || defaultPageSize);
  const pageTotal = Math.ceil(total / pageSize);

  useEffect(() => {
    if (pageSizeProp && pageSize !== pageSizeProp) {
      setPageSize(pageSizeProp);
      setCurrent(1);
    }
  }, [pageSizeProp]);

  const handleChangeCurrent = (currentParam: number) => {
    setCurrent(currentParam);
    onChange?.(currentParam, pageSize);
  };

  const buttons = Array.from({ length: pageTotal }, (_, i) => (
    <Button
      type='text'
      className={classNames(styles.item, {
        [styles.active]: current === i + 1,
      })}
      onClick={() => {
        handleChangeCurrent(i + 1);
      }}
    >
      {i + 1}
    </Button>
  ));

  return (
    <div className={styles.pagination}>
      <Button
        type='text'
        className={styles.item}
        disabled={current === 1}
        icon={<LeftOutlined />}
        onClick={() => {
          handleChangeCurrent(current - 1);
        }}
      />
      {buttons}
      <Button
        type='text'
        className={styles.item}
        disabled={current === pageTotal}
        icon={<RightOutlined />}
        onClick={() => {
          handleChangeCurrent(current + 1);
        }}
      />
    </div>
  );
};

export default Pagination;
