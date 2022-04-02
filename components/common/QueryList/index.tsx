import { ReactNode } from 'react';
import HijackRender, { HijackRenderProps } from '../HijackRender';

// NOTE: 原因是T extends unknown[]类型, T只是限制了数组类型及其子类型,但不局限于数组类型, 如果某一个数组上有其他属性, 就无法推导.
export type QueryListProps<T extends unknown[] = unknown[]> = Omit<
  HijackRenderProps<T>,
  'children'
> & {
  children: (item: T[number], index: number, arr: T) => ReactNode | undefined;
};

type RenderChildrenType<T extends unknown[]> = Pick<
  QueryListProps<T>,
  'data' | 'children'
>;
export function renderChildren<T extends unknown[]>({
  data,
  children,
}: RenderChildrenType<T>) {
  return data?.map((item, index, arr) => children(item, index, arr as any));
}

function QueryList<T extends unknown[]>({ data, children, ...rest }: QueryListProps<T>) {
  return (
    <HijackRender<T> {...rest} data={data}>
      <>{renderChildren({ data, children })}</>
    </HijackRender>
  );
}

export default QueryList;
