import { useMemo } from 'react';
import { GetCommentHook } from '@/entities/comment';
import useComment, { UseComment } from '@/framework/blog/comment/use-comment';
import { SWRHook } from '@/framework/blog/utils/types';

export default useComment as UseComment<typeof handler>;

export const handler: SWRHook<GetCommentHook> = {
  fetchOptions: {
    url: '/api/comment',
    method: 'GET',
  },
  fetcher: ({ fetch, input, options }) => {
    if (!input.articleId) return null;
    const url = new URL(options.url!, 'http://a');

    url.searchParams.set('articleId', String(input.articleId));

    return fetch({
      ...options,
      url: url.pathname + url.search,
    });
  },
  useHook:
    ({ useData }) =>
    input => {
      const response = useData({
        input: [['articleId', input.articleId]],
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      });
      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.length ?? 0) <= 0;
              },
              enumerable: true,
            },
          }),
        [response]
      );
    },
};
