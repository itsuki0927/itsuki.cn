import { LockOutlined, UnlockOutlined, StopOutlined } from '@ant-design/icons';

export enum ArticleOpen {
  Password = 0, // 需要密码
  Public = 1, // 公开状态
  Secret = -1, // 私密
}

const articleOpenMap = new Map(
  [
    {
      id: ArticleOpen.Public,
      name: '公开',
      icon: <UnlockOutlined />,
      color: 'green',
    },
    {
      id: ArticleOpen.Password,
      name: '需密码',
      icon: <LockOutlined />,
      color: 'orange',
    },
    {
      id: ArticleOpen.Secret,
      name: '私密',
      icon: <StopOutlined />,
      color: 'red',
    },
  ].map(item => [item.id, item])
);

export const ap = (state: ArticleOpen) => articleOpenMap.get(state)!;

export const articleOpens = Array.from<ReturnType<typeof ap>>(articleOpenMap.values());
