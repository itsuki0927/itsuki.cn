import { useCallback } from 'react';
import { Provider, useBlog } from '../context';
import type { MutationHook, PickRequired, SWRHook } from './types';
import useData from './use-data';

/**
 * 获取发送请求的fetcher
 *
 * @returns fetcher
 */
export const useFetcher = () => {
  const { providerRef, fetcherRef } = useBlog();
  return providerRef.current.fetcher ?? fetcherRef.current;
};

/**
 * 获取到需要执行的handler
 *
 * @param fn context => context.module.handler
 * @returns 执行的handler
 */
export const useHandler = <
  P extends Provider,
  H extends MutationHook<any> | SWRHook<any>
>(
  fn: (provider: P) => H
) => {
  const { providerRef } = useBlog<P>();
  const provider = providerRef.current;
  // 全局context提供给fn函数进行回调读取handler
  return fn(provider);
};

export const useSWRHook = <H extends SWRHook<any>>(
  handler: PickRequired<H, 'fetcher'>
) => {
  const fetcher = useFetcher();

  // 执行handler上的useHook, 传入useData函数参数
  return handler.useHook({
    useData(ctx) {
      const response = useData(handler, ctx?.input ?? [], fetcher, ctx?.swrOptions);
      return response;
    },
  });
};

export const useMutationHook = <H extends MutationHook<any>>(
  hook: PickRequired<H, 'fetcher'>
) => {
  const fetcher = useFetcher();

  return hook.useHook({
    fetch: useCallback(
      ({ input } = {}) =>
        hook.fetcher({
          input,
          options: hook.fetchOptions,
          fetch: fetcher,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [fetcher, hook.fetchOptions]
    ),
  });
};
