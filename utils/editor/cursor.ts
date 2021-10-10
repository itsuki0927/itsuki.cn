export function getSelection() {
  // if (editor.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
  //   return (editor.parentNode as Document).getSelection()!;
  // }
  return window.getSelection()!;
}

/**
 * 返回选区前面的文本
 * @param node 新选区的节点内容
 * @returns 字符串
 */
export function textBeforeCursor(node: Node) {
  // 获取选区
  const s = getSelection();
  // 获取第一个选区
  const r0 = s.getRangeAt(0);
  // 创建一个新的选区
  const r = document.createRange();
  // 选中editor内容元素
  r.selectNodeContents(node);
  // startOffset: 当前选中的位置在整个元素块的开始位置
  // setEnd: 就是选中元素块的前面那部分
  r.setEnd(r0.startContainer, r0.startOffset);
  return r.toString();
}

/**
 * 返回选区后面的文本
 * @param node 新选区的节点内容
 * @returns 字符串
 */
export function textAfterCursor(node: Node) {
  const s = getSelection();
  const r0 = s.getRangeAt(0);
  const r = document.createRange();
  r.selectNodeContents(node);
  r.setStart(r0.endContainer, r0.endOffset);
  return r.toString();
}

export default { textAfterCursor, textBeforeCursor, getSelection };
