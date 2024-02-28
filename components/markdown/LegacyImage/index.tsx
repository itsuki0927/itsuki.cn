'use client';

import type { StandardProps } from '@/types/common';
import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import LoadingDots from './LoadingDots';

interface LegacyImageProps extends StandardProps {
  src?: string;
  alt?: string;
}

const LegacyImage = ({
  src,
  alt,
  className = '',
  ...rest
}: LegacyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const inView = useInView(imgRef);

  const handleLoad = () => {
    setLoading(false);
    setLoaded(true);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    if (inView && !loaded) {
      const dataSrc = imgRef.current?.getAttribute('data-src');
      if (dataSrc && imgRef.current) {
        setLoading(true);
        imgRef.current.src = dataSrc;
      }
    }
  }, [inView, loaded]);

  return (
    <figure
      className={clsx(
        'relative mx-0 mb-9 rounded-lg border border-solid border-zinc-200',
      )}
      key={src}
    >
      {isLoading ? (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-50 z-10">
          <LoadingDots />
        </div>
      ) : null}
      {isError ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center z-20 bg-zinc-50">
          <ImageOff size={24} />
          <p className="text-sm mt-2">加载错误</p>
        </div>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={alt}
        className={clsx(
          'block max-w-full cursor-pointer p-2 rounded-lg',
          className,
          isError ? 'min-h-[72px] opacity-0' : '',
          isLoading ? 'min-h-[72px]' : '',
        )}
        data-src={src}
        ref={imgRef}
        {...rest}
        onError={handleError}
        onLoad={handleLoad}
      />
      {!isError && alt ? (
        <figcaption className="px-2 text-xs pointer-events-none select-none border-t border-dashed border-zinc-200 py-1 text-center sm:text-sm leading-6 text-zinc-600">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
};

export default LegacyImage;
