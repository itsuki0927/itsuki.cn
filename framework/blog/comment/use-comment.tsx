import { GetCommentHook } from '@/entities/comment';
import { Provider } from '..';
import { SWRFetcher } from '../utils/default-fetcher';
import { SWRHook } from '../utils/types';
import { useHandler, useSWRHook } from '../utils/use-hook';

export type UseComment<H extends SWRHook<GetCommentHook<any>> = SWRHook<GetCommentHook>> =
  ReturnType<H['useHook']>;

export const fetcher = SWRFetcher;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
const fn = (provider: Provider) => provider.comment?.useComment!;

const useComment: UseComment = input => {
  const handler = useHandler(fn);

  return useSWRHook({ fetcher, ...handler })(input);
};

export default useComment;
