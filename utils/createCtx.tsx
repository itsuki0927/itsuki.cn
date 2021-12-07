import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from 'react';

export function useCtx<T>(context: any): T {
  const value = useContext<T>(context);
  if (value === undefined) {
    throw new Error('useCtx must be inside a Provider with a value');
  }
  return value;
}

export function createCtx<StateType, ActionType>(
  reducer: Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const storeContext = createContext<StateType>(null!);
  const dispatchContext = createContext<Dispatch<ActionType>>(null!);

  function Provider({ children }: PropsWithChildren<Record<string, any>>) {
    const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
      reducer,
      initialState
    );

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={state}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  }

  function useDispatch() {
    return useCtx(dispatchContext) as (payload: ActionType) => StateType;
  }

  function useStore() {
    return useCtx<StateType>(storeContext);
  }

  return [Provider, useDispatch, useStore] as const;
}
