import { LikeArticleHook } from '@/entities/article';
import type { Provider } from '..';
import { mutationFetcher } from '../utils/default-fetcher';
import type { MutationHook } from '../utils/types';
import { useHandler, useMutationHook } from '../utils/use-hook';

export type UseLikeArticle<
  H extends MutationHook<LikeArticleHook<any>> = MutationHook<LikeArticleHook>
> = ReturnType<H['useHook']>;

export const fetcher = mutationFetcher;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
const fn = (provider: Provider) => provider.article?.useLikeArticle!;

const useLikeArticle: UseLikeArticle = (...args) => {
  const handler = useHandler(fn);
  return useMutationHook({ fetcher, ...handler })(...args);
};

export default useLikeArticle;
