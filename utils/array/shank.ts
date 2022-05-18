function shank<T>(arr: T[], index: number, delCount: number, ...insertElements: T[]) {
  return arr
    .slice(0, index)
    .concat(insertElements)
    .concat(arr.slice(index + delCount));
}
export default shank;
