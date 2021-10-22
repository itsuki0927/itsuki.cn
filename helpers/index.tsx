import { getBlogProvider, useBlog as useCoreBlog } from './context';
import { itsukiBlogProvider, ItsukiBlogProvider } from './provider';

export { itsukiBlogProvider };
export type { ItsukiBlogProvider };

export const BlogProvider = getBlogProvider(itsukiBlogProvider);

export const useBlog = () => useCoreBlog<ItsukiBlogProvider>();
