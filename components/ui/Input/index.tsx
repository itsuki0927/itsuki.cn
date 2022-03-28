import classNames from 'classnames';
import React, { useCallback } from 'react';
import mergeRefs from '@/utils/mergeRef';
import styles from './style.module.scss';

type ValueType = string | number | ReadonlyArray<string>;

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  defaultValue?: ValueType;
  value?: ValueType;
  onChange?: (value: ValueType, event: React.SyntheticEvent) => void;
  disabled?: boolean;
  plaintext?: boolean;
  readOnly?: boolean;
  type?: string;
  id?: string;
  inputRef?: React.Ref<any>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = React.forwardRef((props: InputProps, ref: any) => {
  const {
    className,
    type = 'text',
    disabled,
    value,
    defaultValue,
    inputRef,
    id,
    plaintext,
    readOnly,
    onPressEnter,
    onFocus,
    onBlur,
    onKeyDown,
    onChange,
    ...rest
  } = props;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onPressEnter?.(event);
      }
      onKeyDown?.(event);
    },
    [onPressEnter, onKeyDown]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target?.value, event);
    },
    [onChange]
  );

  const classString = classNames(
    styles.input,
    {
      [styles.plaintext]: !!plaintext,
    },
    className
  );

  if (plaintext) {
    return <>{typeof value === 'undefined' ? defaultValue : value}</>;
  }

  const operable = !disabled && !readOnly;
  const eventProps: React.HTMLAttributes<HTMLInputElement> = {};

  if (operable) {
    eventProps.onChange = handleChange;
    eventProps.onKeyDown = handleKeyDown;
  }

  return (
    <input
      {...rest}
      {...eventProps}
      ref={mergeRefs(ref, inputRef)}
      className={classString}
      type={type}
      id={id}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
});

export default Input;
