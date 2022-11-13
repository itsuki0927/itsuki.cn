'use client';

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
  // popup action
  openPopup: (params?: UIParams) => void;
  setPopupView: (view: PopupViews) => void;
  closePopup: () => void;

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
      type: 'OPEN_POPUP';
      params?: UIParams;
    }
  | {
      type: 'CLOSE_POPUP';
    }
  | {
      type: 'SET_POPUP_VIEW';
      view: PopupViews;
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
  }
}

export const UIProvider = (props: PropsWithChildren<Record<string, any>>) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openPopup = useCallback(
    (params?: UIParams) => dispatch({ type: 'OPEN_POPUP', params }),
    [dispatch]
  );
  const closePopup = useCallback(() => dispatch({ type: 'CLOSE_POPUP' }), [dispatch]);

  const setPopupView = useCallback(
    (view: PopupViews) => dispatch({ type: 'SET_POPUP_VIEW', view }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      popupView: state.popup.view,
      displayPopup: state.popup.display,
      popupParams: state.popup.params,

      openPopup,
      closePopup,
      setPopupView,
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
