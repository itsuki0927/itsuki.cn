import contains from './contains';
import getWindow from './getWindow';
import ownerDocument from './ownerDocument';

export type Offset = {
  top: number;
  left: number;
  height: number;
  width: number;
};

/**
 * 获取元素top、left、width、height
 * @param node 元素节点
 * @returns {top, left, width, height}
 */
const getOffset = (node: Element): Offset | DOMRect | null => {
  // 获取document
  const doc = ownerDocument(node);
  // 获取document关联的window
  const win = getWindow(doc);
  const docElement = doc && doc.documentElement;

  let box = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  if (!doc) return null;

  if (!contains(docElement, node)) return box;

  if (node.getBoundingClientRect) {
    box = node.getBoundingClientRect();
  }

  // 根据rect计算元素top、left
  if ((box.width || box.height) && docElement && win) {
    box = {
      top:
        box.top + (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0),
      left:
        box.left +
        (win.pageXOffset || docElement.scrollLeft) -
        (docElement.clientLeft || 0),
      width: (box.width === null ? (node as HTMLElement).offsetWidth : box.width) || 0,
      height:
        (box.height === null ? (node as HTMLElement).offsetHeight : box.height) || 0,
    };
  }

  return box;
};

export default getOffset;
