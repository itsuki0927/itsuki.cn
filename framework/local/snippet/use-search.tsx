import { SearchSnippetsHook } from '@/entities/snippet';
import { Provider } from '@/framework/blog';
import { SWRFetcher } from '@/framework/blog/utils/default-fetcher';
import type { HookFetcherFn, SWRHook } from '@/framework/blog/utils/types';
import { useHandler, useSWRHook } from '@/framework/blog/utils/use-hook';

const LIMIT = '2000';

export type UseSearch<
  H extends SWRHook<SearchSnippetsHook<any>> = SWRHook<SearchSnippetsHook>
> = ReturnType<H['useHook']>;

export const fetcher: HookFetcherFn<SearchSnippetsHook> = SWRFetcher;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
const fn = (provider: Provider) => provider.snippet?.useSearch!;

const useSearch: UseSearch = input => {
  const handler = useHandler(fn);
  return useSWRHook({ fetcher, ...handler })(input);
};

export const handler: SWRHook<SearchSnippetsHook> = {
  fetchOptions: {
    url: '/api/snippet',
    method: 'GET',
  },
  async fetcher({ options, fetch, input }) {
    const url = new URL(options.url!, 'http://a');
    const { keyword } = input;

    if (keyword) {
      url.searchParams.set('keyword', keyword);
    }

    url.searchParams.set('pageSize', LIMIT);

    const data = await fetch({
      ...options,
      url: url.pathname + url.search,
    });

    return data;
  },
  useHook:
    ({ useData }) =>
    (input = {}) =>
      useData({
        input: [
          ['keyword', input.keyword],
          ['pageSize', input.pageSize],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      }),
};

export default useSearch;
