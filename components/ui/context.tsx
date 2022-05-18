import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
  useContext,
} from 'react';

export interface State {
  displaySidebar: boolean;
  displayPopup: boolean;
  sidebarView: SidebarViews;
  popupView: PopupViews;
}

const initialState: State = {
  displaySidebar: true,
  displayPopup: false,
  popupView: 'IMAGE_VIEW',
  sidebarView: 'STANDARD_VIEW',
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_POPUP';
    }
  | {
      type: 'CLOSE_POPUP';
    }
  | {
      type: 'SET_POPUP_VIEW';
      view: PopupViews;
    }
  | {
      type: 'SET_SIDEBAR_VIEW';
      view: SidebarViews;
    };

// eslint-disable-next-line @typescript-eslint/naming-convention
export type PopupViews = 'IMAGE_VIEW' | 'SPONSOR_VIEW';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type SidebarViews = 'STANDARD_VIEW' | 'COMMENT_LEADERBOARD_VIEW';

export const UIContext = createContext<State>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case 'OPEN_POPUP': {
      return {
        ...state,
        displayPopup: true,
        displaySidebar: false,
      };
    }
    case 'CLOSE_POPUP': {
      return {
        ...state,
        displayPopup: false,
      };
    }
    case 'SET_POPUP_VIEW': {
      return {
        ...state,
        popupView: action.view,
      };
    }
    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
  }
}

export const UIProvider = (props: PropsWithChildren<Record<string, any>>) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = useCallback(() => dispatch({ type: 'OPEN_SIDEBAR' }), [dispatch]);
  const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch]);
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: 'CLOSE_SIDEBAR' })
        : dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  );
  const closeSidebarIfPresent = useCallback(
    () => state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  );

  const openPopup = useCallback(() => dispatch({ type: 'OPEN_POPUP' }), [dispatch]);
  const closePopup = useCallback(() => dispatch({ type: 'CLOSE_POPUP' }), [dispatch]);

  const setPopupView = useCallback(
    (view: PopupViews) => dispatch({ type: 'SET_POPUP_VIEW', view }),
    [dispatch]
  );

  const setSidebarView = useCallback(
    (view: SidebarViews) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openPopup,
      closePopup,
      setPopupView,
      setSidebarView,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext) as State & {
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
    closeSidebarIfPresent: () => void;
    openPopup: () => void;
    closePopup: () => void;
    setPopupView: (view: PopupViews) => void;
    setSidebarView: (view: SidebarViews) => void;
  };
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({
  children,
}: PropsWithChildren<Record<string, any>>) => <UIProvider>{children}</UIProvider>;
