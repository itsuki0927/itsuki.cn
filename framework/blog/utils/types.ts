import type { SWRConfiguration } from 'swr';
import { BlogError } from './errors';
import { ResponseState } from './use-data';

export type Override<T, K> = Omit<T, keyof K> & K;

export type PickRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export type Fetcher<T = any, B = any> = (options: FetcherOptions<B>) => T | Promise<T>;

export type FetcherOptions<Body = any> = {
  url?: string;
  query?: string;
  method?: string;
  variables?: any;
  body?: Body;
};

export type HookFetcher<Data, Input = null, Result = any> = (
  options: HookFetcherOptions | null,
  input: Input,
  fetch: <T = Result, Body = any>(options: FetcherOptions<Body>) => Promise<T>
) => Data | Promise<Data>;

export type HookFetcherFn<H extends HookSchemaBase> = (
  context: HookFetcherContext<H>
) => H['data'] | Promise<H['data']>;

export type HookFetcherContext<H extends HookSchemaBase> = {
  options: HookFetcherOptions;
  input: H['fetcherInput'];
  fetch: <
    T = H['fetchData'] extends Record<string, unknown> | null ? H['fetchData'] : any,
    B = H['body']
  >(
    options: FetcherOptions<B>
  ) => Promise<T>;
};
export type HookFetcherOptions = { method?: string } & (
  | { query: string; url?: string }
  | { query?: string; url: string }
);

export type HookInputValue = string | number | boolean | undefined;

export type HookSWRInput = [string, HookInputValue][];

export type HookFetchInput = {
  [k: string]: HookInputValue;
};

// TODO: keyof Input extends never ?
export type HookFunction<
  Input extends Record<string, unknown> | undefined,
  T
> = keyof Input extends never
  ? () => T
  : Partial<Input> extends Input
  ? (input?: Input) => T
  : (input: Input) => T;

export type HookSchemaBase = {
  data: any;
  input?: Record<string, any>;
  fetcherInput?: Record<string, any>;
  body?: Record<string, any>;
  fetchData?: any;
};

export type SWRHookSchemaBase = HookSchemaBase & {
  swrState?: Record<string, any>;
  mutations?: Record<string, ReturnType<MutationHook<any>['useHook']>>;
};

export type MutationSchemaBase = HookSchemaBase & {
  actionInput?: Record<string, any>;
};

export type SWRHook<H extends SWRHookSchemaBase> = {
  useHook(
    context: SWRHookContext<H>
  ): HookFunction<
    H['input'] & { swrOptions?: SwrOptions<H['data'], H['fetcherInput']> },
    ResponseState<H['data']> & H['swrState'] & H['mutations']
  >;
  fetchOptions: HookFetcherOptions;
  fetcher?: HookFetcherFn<H>;
};

export type SWRHookContext<H extends SWRHookSchemaBase> = {
  useData(context?: {
    input?: HookFetchInput | HookSWRInput;
    swrOptions?: SwrOptions<H['data'], H['fetcherInput']>;
  }): ResponseState<H['data']>;
};

export type MutationHook<H extends MutationSchemaBase> = {
  useHook(
    context: MutationHookContext<H>
  ): HookFunction<
    H['input'],
    HookFunction<H['actionInput'], H['data'] | Promise<H['data']>>
  >;
  fetchOptions: HookFetcherOptions;
  fetcher?: HookFetcherFn<H>;
};

export type MutationHookContext<H extends MutationSchemaBase> = {
  fetch: keyof H['fetcherInput'] extends never
    ? () => H['data'] | Promise<H['data']>
    : Partial<H['fetcherInput']> extends H['fetcherInput']
    ? (context?: { input?: H['fetcherInput'] }) => H['data'] | Promise<H['data']>
    : (context: { input: H['fetcherInput'] }) => H['data'] | Promise<H['data']>;
};

export type SwrOptions<Data, Input = null, Result = any> = SWRConfiguration<
  Data,
  BlogError,
  HookFetcher<Data, Input, Result>
>;
