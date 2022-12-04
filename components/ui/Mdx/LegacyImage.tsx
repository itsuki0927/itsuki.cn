import { useInView } from 'framer-motion';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'react-feather';
import { StandardProps } from '@/types/common';
import LoadingDots from '../LoadingDots';

interface ImgProps extends StandardProps {
  src?: string;
  alt?: string;
}

const LegacyImage = ({ src, alt, className = '', ...rest }: ImgProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const inView = useInView(imgRef);

  const handleLoad = useCallback(() => {
    setLoading(false);
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  useEffect(() => {
    if (inView && !loaded) {
      const dataSrc = imgRef.current?.getAttribute('data-src');
      if (dataSrc && imgRef.current) {
        imgRef.current.src = dataSrc;
      }
    }
  }, [inView, loaded]);

  return (
    <figure
      key={src}
      className={classNames(
        'relative mx-0 mb-9 rounded-sm border border-solid border-gray-300'
      )}
    >
      <div
        className={classNames(
          'absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-50',
          isLoading ? 'z-10' : 'pointer-events-none invisible z-0'
        )}
      >
        <LoadingDots />
      </div>
      <div
        className={classNames(
          'absolute left-0 top-0 flex h-full w-full items-center justify-center text-gray-600',
          isError ? 'z-20' : 'pointer-events-none invisible z-0'
        )}
      >
        <AlertTriangle size={24} />
      </div>
      <img
        ref={imgRef}
        data-src={src}
        className={classNames(
          'block max-w-full p-2',
          className,
          isError ? 'min-h-[72px] opacity-0' : '',
          isLoading ? 'min-h-[72px]' : ''
        )}
        alt={alt}
        {...rest}
        onLoad={handleLoad}
        onError={handleError}
      />
      {!isError && alt ? (
        <figcaption className='pointer-events-none select-none border-t border-dashed border-gray-300 py-1 text-center text-sm leading-6 text-gray-600'>
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
};

export default LegacyImage;
