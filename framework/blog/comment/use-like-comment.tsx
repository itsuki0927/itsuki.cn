import { LikeCommentHook } from '@/entities/comment';
import type { Provider } from '..';
import { mutationFetcher } from '../utils/default-fetcher';
import type { MutationHook } from '../utils/types';
import { useHandler, useMutationHook } from '../utils/use-hook';

export type UseLikeComment<
  H extends MutationHook<LikeCommentHook<any>> = MutationHook<LikeCommentHook>
> = ReturnType<H['useHook']>;

export const fetcher = mutationFetcher;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
const fn = (provider: Provider) => provider.comment?.useLikeComment!;

const useLikeComment: UseLikeComment = (...args) => {
  const handler = useHandler(fn);
  return useMutationHook({ fetcher, ...handler })(...args);
};

export default useLikeComment;
