import { SearchArticlesHook } from '@/entities/article';
import { Provider } from '..';
import { SWRFetcher } from '../utils/default-fetcher';
import type { HookFetcherFn, SWRHook } from '../utils/types';
import { useHandler, useSWRHook } from '../utils/use-hook';

export type UseSearch<
  H extends SWRHook<SearchArticlesHook<any>> = SWRHook<SearchArticlesHook>
> = ReturnType<H['useHook']>;

export const fetcher: HookFetcherFn<SearchArticlesHook> = SWRFetcher;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
const fn = (provider: Provider) => provider.article?.useSearch!;

const useSearch: UseSearch = input => {
  const handler = useHandler(fn);
  // 这里的fetcher是提供一个默认值的fetcher
  // 如果handler里面有fetcher会把它覆盖
  return useSWRHook({ fetcher, ...handler })(input);
};

export const handler: SWRHook<SearchArticlesHook> = {
  fetchOptions: {
    url: '/api/article',
    method: 'GET',
  },
  async fetcher({ options, fetch, input }) {
    const url = new URL(options.url!, 'http://a');
    const { category, search, tag } = input;

    if (category) {
      url.searchParams.set('category', category);
    }
    if (search) {
      url.searchParams.set('search', search);
    }
    if (tag) {
      url.searchParams.set('tag', tag);
    }

    const data = await fetch({
      ...options,
      url: url.pathname + url.search,
    });

    return data;
  },
  useHook:
    ({ useData }) =>
    (input = {}) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useData({
        input: [
          ['search', input.search],
          ['category', input.category],
          ['tag', input.tag],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      }),
};

export default useSearch;
