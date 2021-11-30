export enum RanksState {
  Easy = 0, // 简单
  Medium = 1, // 中等
  Hard = 2, // 困难
}

export const ranksMap = new Map(
  [
    {
      id: RanksState.Easy,
      name: '简单',
      color: '#78c02a',
    },
    {
      id: RanksState.Medium,
      name: '中等',
      color: '#ffb300',
    },
    {
      id: RanksState.Hard,
      name: '困难',
      color: '#ff4d4f',
    },
  ].map(item => [item.id, item])
);

export const rs = (state: RanksState) => ranksMap.get(state)!;

export const snippetRanks = Array.from<ReturnType<typeof rs>>(ranksMap.values());
