import classNames from 'classnames';
import { KeyboardEvent, ReactNode, useCallback, useEffect } from 'react';
import { off, on } from '@/utils/events';
import { useUI } from '../context';

export type PopupProps = {
  children?: ReactNode;
};

const Popup = ({ children }: PopupProps) => {
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
    (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'esc') {
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
};

export default Popup;
