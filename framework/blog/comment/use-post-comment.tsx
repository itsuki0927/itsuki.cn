import { PostCommentHook } from '@/entities/comment';
import { Provider } from '..';
import { mutationFetcher } from '../utils/default-fetcher';
import { HookFetcherFn, MutationHook } from '../utils/types';
import { useHandler, useMutationHook } from '../utils/use-hook';

export type UsePostComment<
  H extends MutationHook<PostCommentHook<any>> = MutationHook<PostCommentHook>
> = ReturnType<H['useHook']>;

export const fetcher: HookFetcherFn<PostCommentHook> = mutationFetcher;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
const fn = (provider: Provider) => provider.comment?.usePostComment!;

const usePostComment: UsePostComment = (...args) => {
  const handler = useHandler(fn);

  return useMutationHook({ fetcher, ...handler })(...args);
};

export default usePostComment;
