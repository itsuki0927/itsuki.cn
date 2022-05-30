import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
  useContext,
} from 'react';

export type UIParams = Record<string, any>;

export interface UIContextType {
  // sidebar action
  openSidebar: (params?: UIParams) => void;
  setSidebarView: (view: SidebarViews) => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  closeSidebarIfPresent: () => void;

  // popup action
  openPopup: (params?: UIParams) => void;
  setPopupView: (view: PopupViews) => void;
  closePopup: () => void;

  // sidebar args
  sidebarView: SidebarViews;
  displaySidebar: boolean;
  sidebarParams?: UIParams;

  // popup args
  popupView: PopupViews;
  displayPopup: boolean;
  popupParams?: UIParams;
}

export interface State {
  sidebar: {
    display: boolean;
    view: SidebarViews;
    params?: Record<string, any>;
  };
  popup: {
    display: boolean;
    view: PopupViews;
    params?: Record<string, any>;
  };
}

const initialState: State = {
  sidebar: {
    display: true,
    view: 'STANDARD_VIEW',
  },
  popup: {
    display: false,
    view: 'IMAGE_VIEW',
  },
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
      params?: UIParams;
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_POPUP';
      params?: UIParams;
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
export type PopupViews = 'IMAGE_VIEW' | 'SPONSOR_VIEW' | 'WECHAT_VIEW';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type SidebarViews = 'STANDARD_VIEW' | 'COMMENT_LEADERBOARD_VIEW';

export const UIContext = createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          ...(action.params && { params: { ...state.sidebar.params, ...action.params } }),
          display: true,
        },
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          display: false,
        },
      };
    }
    case 'OPEN_POPUP': {
      return {
        ...state,
        popup: {
          ...state.popup,
          ...(action.params && { params: { ...state.popup.params, ...action.params } }),
          display: true,
        },
      };
    }
    case 'CLOSE_POPUP': {
      return {
        ...state,
        popup: {
          ...state.popup,
          display: false,
        },
      };
    }
    case 'SET_POPUP_VIEW': {
      return {
        ...state,
        popup: {
          ...state.popup,
          view: action.view,
        },
      };
    }
    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          view: action.view,
        },
      };
    }
  }
}

export const UIProvider = (props: PropsWithChildren<Record<string, any>>) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = useCallback(
    (params?: UIParams) => dispatch({ type: 'OPEN_SIDEBAR', params }),
    [dispatch]
  );
  const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch]);
  const toggleSidebar = useCallback(
    () =>
      state.sidebar.display
        ? dispatch({ type: 'CLOSE_SIDEBAR' })
        : dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch, state.sidebar.display]
  );
  const closeSidebarIfPresent = useCallback(
    () => state.sidebar.display && dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch, state.sidebar.display]
  );

  const openPopup = useCallback(
    (params?: UIParams) => dispatch({ type: 'OPEN_POPUP', params }),
    [dispatch]
  );
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
      sidebarView: state.sidebar.view,
      displaySidebar: state.sidebar.display,
      sidebarParams: state.sidebar.params,
      popupView: state.popup.view,
      displayPopup: state.popup.display,
      popupParams: state.popup.params,

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
  const context = useContext(UIContext) as UIContextType;
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({
  children,
}: PropsWithChildren<Record<string, any>>) => <UIProvider>{children}</UIProvider>;
