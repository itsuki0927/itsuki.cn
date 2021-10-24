import { GetSiteInfoOperation, SiteInfo } from '@/entities/siteInfo';
import { BlogAPIConfig } from '@/framework/blog/api';
import { OperationContext } from '@/framework/blog/api/operations';
import { Provider } from '@/framework/local/api';

const getSiteInfoQuery = '/site-info';

export type GetSiteInfoQuery = SiteInfo;

function getSiteInfoOperation({ blog }: OperationContext<Provider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>(): Promise<T['data']>;

  async function getSiteInfo<T extends GetSiteInfoOperation>({
    query = getSiteInfoQuery,
    config: cfg,
  }: {
    query?: string;
    config?: Partial<BlogAPIConfig>;
  } = {}): Promise<T['data']> {
    const config = blog.getConfig(cfg);
    const res = await config.fetch<GetSiteInfoQuery>('GET', query);
    return res.data;
  }

  return getSiteInfo;
}

export default getSiteInfoOperation;
