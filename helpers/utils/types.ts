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

export type HookFetchFn<H extends HookSchemaBase> = (
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
export type HookFetcherOptions = { methods?: string } & (
  | { query: string; url?: string }
  | { query?: string; url: string }
);

export type HookInputValue = string | number | boolean | undefined;

export type HookSWRInput = [string, HookInputValue][];

export type HookSchemaBase = {
  data: any;
  input?: Record<string, any>;
  fetcherInput?: Record<string, any>;
  body?: Record<string, any>;
  fetchData?: any;
};
