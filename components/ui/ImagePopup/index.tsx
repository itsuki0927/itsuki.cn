import { useCallback, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
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

  const handleClick = useCallback(e => {
    if (e.target.id === 'overlay') {
      setVisible(false);
    }
  }, []);

  const open = (url: string) => {
    setVisible(true);
    setImageUrl(url);
  };

  useImperativeHandle(ref, () => ({
    open,
  }));

  useEffect(() => {
    if (src && src !== imageUrl) {
      setImageUrl(src);
    }
  }, [imageUrl, src]);

  useEffect(() => {
    if (visible) {
      on(document, 'click', handleClick);
    }
    return () => {
      off(document, 'click', handleClick);
    };
  }, [handleClick, visible]);

  return (
    <div>
      {visible ? (
        <div
          id='overlay'
          className='fixed inset-0 z-50 -mt-6 flex items-center justify-center overflow-hidden bg-[#c0c0c080] backdrop-blur-sm transition-all'
        >
          <img
            id='popupImage'
            alt='popup show'
            src={imageUrl}
            className='rounded-md border-8 border-solid border-white-1 object-cover dark:border-white-1--dark'
          />
        </div>
      ) : null}
    </div>
  );
});

export default ImagePopup;
