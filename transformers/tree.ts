const NO_PARENT_VALUE = 0;

type ConvertTreeData = {
  parentId: number;
  id: number;
  [key: string]: any;
};

type TreeData<T = ConvertTreeData> = ConvertTreeData & {
  children?: T[];
  name?: string;
};

/**
 * 将带有parentId和id的数组转换为树
 *
 * @param data 数组
 * @returns 树
 */
export function convertToTreeData<T extends ConvertTreeData>(dataSources: T[]) {
  function buildConvertToTreeData(data: T[], parentId: number): TreeData<T>[] {
    const parentData = data.filter(v => v.parentId === parentId) as TreeData<T>[];

    return parentData.map(item => {
      const children = buildConvertToTreeData(data, item.id);
      return { ...item, children };
    }) as TreeData<T>[];
  }

  return buildConvertToTreeData(dataSources, NO_PARENT_VALUE);
}

export default {
  convertToTreeData,
};
