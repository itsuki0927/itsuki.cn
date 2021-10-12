/**
 * 获取 window 对象
 *
 * @param node 节点
 * @returns window
 */
const getWindow = (node: any) => {
  if (node === node?.window) {
    return node;
  }

  // nodeType:9 是 document
  // node.defaultView 获取 document 关联的 window
  return node?.nodeType === 9 ? node?.defaultView : null;
};

export default getWindow;
