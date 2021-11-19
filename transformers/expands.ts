interface ExpandItem {
  name: string;
  value: string;
}

type ExpandValueResult = Record<string, string>;

export const getExpandsValue = <T extends ExpandValueResult = ExpandValueResult>(
  expandsString?: string
): T => {
  const expandsMap = {} as T;
  if (!expandsString) return expandsMap;
  try {
    const expands = JSON.parse(expandsString) as ExpandItem[];
    if (!expands || !expands.length) {
      return expandsMap;
    }
    return expands.reduce((result, { name, value }) => {
      Reflect.set(result, name, value);
      return result;
    }, expandsMap);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('expandsValue解析错误');
  }
  return expandsMap;
};

export const getExpandValue = (expandsString: string, key: string) => {
  const expands = getExpandsValue(expandsString);
  return expands[key];
};

export default getExpandsValue;
