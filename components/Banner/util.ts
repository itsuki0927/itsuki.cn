export const getExpandsValue = (expands: any, key: string) => {
  if (!expands || !expands.length) {
    return null;
  }
  const targetExtend = expands.find((t: any) => t.name === key);
  return targetExtend ? targetExtend.value : null;
};

export default {
  getExpandsValue,
};
