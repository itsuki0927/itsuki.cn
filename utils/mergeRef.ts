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

function mergeRefs<T>(...refs: (Ref<T> | null)[]) {
  return (value: T | null) => {
    refs.forEach(ref => {
      if (value) {
        const fnRef = toFnRef(ref);
        if (fnRef) {
          fnRef(value);
        }
      }
    });
  };
}

export default mergeRefs;
