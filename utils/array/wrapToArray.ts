const wrapToArray = <T = any>(val: T) =>
  (Array.isArray(val) ? val : [val]) as T extends Array<any> ? T : T[];

export default wrapToArray;
