import useSWR, { SWRResponse } from 'swr';
import { BlogError } from './errors';
// eslint-disable-next-line import/no-cycle
import {
  Fetcher,
  HookFetcherFn,
  HookFetcherOptions,
  HookFetchInput,
  HookSWRInput,
  SWRHookSchemaBase,
  SwrOptions,
} from './types';

export type ResponseState<Result> = SWRResponse<Result, BlogError> & {
  isLoading: boolean;
};

export type UseData = <H extends SWRHookSchemaBase>(
  options: {
    fetchOptions: HookFetcherOptions;
    fetcher: HookFetcherFn<H>;
  },
  input: HookFetchInput | HookSWRInput,
  fetcherFn: Fetcher,
  swrOptions?: SwrOptions<H['data'], H['fetcherInput']>
) => ResponseState<H['data']>;

/**
 * 调用handle定义的fetcher
 * 提供一个fetch参数将执行权反转给用户
 *
 * @param handler handler
 * @param input input传入数据
 * @param fetcherFn fetcher函数
 * @param swrOptions swr额外参数
 * @returns response接口数据
 */
const useData: UseData = (handler, input, fetcherFn, swrOptions) => {
  const hookInput = Array.isArray(input) ? input : Object.entries(input);
  const fetcher = async (
    url: string,
    query?: string,
    method?: string,
    ...args: any[]
  ) => {
    const inputObj = args.reduce((obj, val, i) => {
      obj[hookInput[i][0]!] = val;
      return obj;
    }, {});
    try {
      // 调用的是handler定义的fetcher
      return await handler.fetcher({
        options: { url, query, method },
        input: inputObj,
        fetch: fetcherFn,
      });
    } catch (error) {
      if (!(error instanceof BlogError)) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      throw error;
    }
  };
  // 使用swr进行数据请求
  const response = useSWR(
    () => {
      const opts = handler.fetchOptions;
      return opts
        ? [opts.url, opts.query, opts.method, ...hookInput.map(v => v[1])]
        : null;
    },
    fetcher,
    swrOptions
  );

  if (!('isLoading' in response)) {
    Object.defineProperty(response, 'isLoading', {
      get() {
        return response.data === undefined;
      },
      enumerable: true,
    });
  }
  return response as typeof response & { isLoading: boolean };
};

export default useData;
