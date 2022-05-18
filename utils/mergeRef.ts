type CallbackRef<T> = (ref: T | null) => void;

type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>;

function toFnRef<T>(ref?: Ref<T> | null) {
  return !ref || typeof ref === 'function'
    ? ref
    : (value: T) => {
        // eslint-disable-next-line no-param-reassign
        ref.current = value;
      };
}

function mergeRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return (value: T | null) => {
    if (value) {
      if (typeof a === 'function') a(value);
      if (typeof b === 'function') b(value);
    }
  };
}

export default mergeRefs;
