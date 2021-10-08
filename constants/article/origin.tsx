import { EditOutlined, CopyOutlined, PullRequestOutlined } from '@ant-design/icons';

/** 文章来源 */
export enum ArticleOrigin {
  Original = 0, // 原创
  Reprint = 1, // 转载
  Hybrid = 2, // 混合
}

const articleOriginMap = new Map(
  [
    {
      id: ArticleOrigin.Original,
      name: '原创',
      icon: <EditOutlined />,
      color: '#52c41a',
    },
    {
      id: ArticleOrigin.Reprint,
      name: '转载',
      icon: <CopyOutlined />,
      color: '#ff4d4f',
    },
    {
      id: ArticleOrigin.Hybrid,
      name: '混合',
      icon: <PullRequestOutlined />,
      color: '#faad14',
    },
  ].map(item => [item.id, item])
);

export const ao = (state: ArticleOrigin) => articleOriginMap.get(state)!;

export const articleOrigins = Array.from<ReturnType<typeof ao>>(articleOriginMap.values());
