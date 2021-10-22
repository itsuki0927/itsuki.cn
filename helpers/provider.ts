import fetcher from './fetcher';

export const itsukiBlogProvider = {
  locale: 'zh-cn',
  fetcher,
};

export type ItsukiBlogProvider = typeof itsukiBlogProvider;
