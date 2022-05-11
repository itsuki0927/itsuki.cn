import { useCallback, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import { off, on } from '@/utils/events';

export type ImagePopupProps = {
  src?: string;
};
export type ImagePopupRef = {
  open: (url: string) => void;
};

const ImagePopup = forwardRef<ImagePopupRef, ImagePopupProps>(({ src }, ref) => {
  const [imageUrl, setImageUrl] = useState(src || '');
  const [visible, setVisible] = useState(false);

  const handleClick = useCallback((e: any) => {
    if (e.target.id === 'overlay') {
      setVisible(false);
    }
  }, []);

  const handleKeydown = useCallback((e: any) => {
    if (e.keyCode === 27) {
      setVisible(false);
    }
  }, []);

  const open = (url: string) => {
    setVisible(true);
    setImageUrl(url);
  };

  useImperativeHandle(ref, () => ({ open }));

  useEffect(() => {
    if (src && src !== imageUrl) {
      setImageUrl(src);
    }
  }, [imageUrl, src]);

  useEffect(() => {
    if (visible) {
      on(document, 'click', handleClick);
      on(document, 'keydown', handleKeydown);
    }
    return () => {
      off(document, 'click', handleClick);
      off(document, 'keydown', handleKeydown);
    };
  }, [handleClick, visible, handleKeydown]);

  return (
    <div>
      <div
        id='overlay'
        className={classNames(
          'fixed inset-0 flex items-center justify-center overflow-hidden transition-all duration-300',
          'bg-[#ffffff80] backdrop-blur-[2px] backdrop-saturate-150 dark:bg-[#0d0d1050]',
          visible ? 'visible z-50 opacity-100' : 'invisible -z-10 opacity-0'
        )}
      >
        <img
          id='popupImage'
          alt='popup show'
          src={imageUrl}
          className='max-h-[80%] max-w-screen-md rounded-md border-8 border-solid border-white-1 object-cover dark:border-white-1--dark'
        />
      </div>
    </div>
  );
});

export default ImagePopup;
