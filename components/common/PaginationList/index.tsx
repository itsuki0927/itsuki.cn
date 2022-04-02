import { SearchResponse } from '@/types/response';
import { QueryListProps } from '../QueryList';

export type PaginationListProps<T> = Omit<QueryListProps<T[]>, 'data'> & {
  data: SearchResponse<T>;
};

// const PaginationList = <T,>({ data, children, ...rest }: PaginationListProp<T>) => (
//   <QueryList {...rest} data={data?.data}>
//     <>{data?.data.map((item, index, arr) => children(item, index, arr))}</>
//   </QueryList>
// );
const PaginationList = () => null;

export default PaginationList;
