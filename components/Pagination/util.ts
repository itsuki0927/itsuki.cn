import { PaginationProps } from './';

export const paginationKeys = ['pageSize', 'current', 'defaultCurrent', 'defaultPageSize'] as const;

export type CurrentPageSizeProps = Pick<
  PaginationProps,
  'current' | 'pageSize' | 'defaultCurrent' | 'defaultPageSize'
>;

/**
 * 从查询参数中获取current、pageSize props
 *
 * @param query 查询参数
 * @returns { current: 1 , pageSize: 1 }
 */
export const pickPaginationPropsFromQuery = (query?: any) => {
  if (!query) return {};

  return paginationKeys.reduce<CurrentPageSizeProps>((o, k) => {
    if (query[k]) {
      o[k] = query[k];
    }
    return o;
  }, {});
};
