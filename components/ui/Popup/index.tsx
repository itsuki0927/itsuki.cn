import { useCallback, useEffect, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import { off, on } from '@/utils/events';
import { useUI } from '../context';

export type PopupProps = {
  children?: ReactNode;
};
export type PopupRef = {
  open: (url: string) => void;
};

const Popup = forwardRef<PopupRef, PopupProps>(({ children }) => {
  const { displayPopup, closePopup } = useUI();

  const handleClick = useCallback(
    (e: any) => {
      if (e.target.id === 'overlay') {
        closePopup();
      }
    },
    [closePopup]
  );

  const handleKeydown = useCallback(
    (e: any) => {
      if (e.keyCode === 27) {
        closePopup();
      }
    },
    [closePopup]
  );

  useEffect(() => {
    if (displayPopup) {
      on(document, 'click', handleClick);
      on(document, 'keydown', handleKeydown);
    }
    return () => {
      off(document, 'click', handleClick);
      off(document, 'keydown', handleKeydown);
    };
  }, [displayPopup, handleClick, handleKeydown]);

  return (
    <div
      id='overlay'
      className={classNames(
        'fixed inset-0 flex items-center justify-center overflow-hidden transition-all duration-150',
        'bg-[#ffffff80] backdrop-blur-[2px] backdrop-saturate-150',
        displayPopup ? 'visible z-50 opacity-100' : 'invisible -z-10 opacity-0'
      )}
    >
      {children}
    </div>
  );
});

export default Popup;
