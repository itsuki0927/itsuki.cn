import { useCallback, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { off, on } from '@/utils/events';
import styles from './style.module.scss';

type ImagePopupProps = {
  src?: string;
};

const ImagePopup = forwardRef(({ src }: ImagePopupProps, ref) => {
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
    <div className={styles.imagePopup}>
      {visible && (
        <div id='overlay' className={styles.overlay}>
          <img id='popupImage' alt='popup show' src={imageUrl} className={styles.image} />
        </div>
      )}
    </div>
  );
});

export default ImagePopup;
