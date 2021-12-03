import { useCallback, useRef, useState } from 'react';

/**
 * 一个用于控制值管理的hook。
 * 在传递了value props的情况下，会返回value props，否则会返回state value。
 * 一般用于包括受控和非受控模式的组件。
 *
 * @param{T} controlledValue value props
 * @param{T} defaultValue 默认值
 */
function useControlled<T = any>(controlledValue: T, defaultValue: T) {
  const controlledRef = useRef(false);
  controlledRef.current = controlledValue !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = controlledRef.current ? controlledValue : uncontrolledValue;

  const setValue = useCallback(
    nextValue => {
      if (!controlledRef.current) {
        setUncontrolledValue(nextValue);
      }
    },
    [controlledRef]
  );

  return [value, setValue, controlledRef.current] as const;
}

export default useControlled;
