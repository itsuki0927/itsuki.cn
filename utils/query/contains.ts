const fallback = (context: Element, node: Node & ParentNode) => {
  if (node) {
    do {
      if (node === context) {
        return true;
      }
      // eslint-disable-next-line no-cond-assign
    } while (node.parentNode && (node = node.parentNode));
  }
  return false;
};
const contains = (context: Element, node: Node & ParentNode) => {
  if (context.contains) {
    return context.contains(node);
  }
  if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }

  return fallback(context, node);
};
export default contains;
