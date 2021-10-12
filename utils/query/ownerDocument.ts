/**
 * 返回当前节点的顶层的 document 对象, 默认 document
 *
 * @param node 元素节点
 * @returns document
 */
const ownerDocument = (node: Element) => (node && node.ownerDocument) || document;

export default ownerDocument;
