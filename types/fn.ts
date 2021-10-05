// 没有参数和返回值的函数声明
export type EmptyFunction = () => void;

// 没有参数有返回值的函数声明
export type NoParamsFunction<T> = () => T;

// 有参数没有返回值的函数声明
export type NoReturnFunction<T> = (params: T) => void;
