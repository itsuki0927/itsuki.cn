function createEnumObject<T extends string>(o: { [P in T]: P }) {
  return o;
}

export default createEnumObject;
