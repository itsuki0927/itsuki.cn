'use client';

import classNames from 'classnames';
import Image, { ImageLoaderProps, ImageProps } from 'next/image';
import { useState } from 'react';
import { canUseDOM } from '@/utils/query';

export type MyImageProps = Omit<
  ImageProps,
  'loader' | 'loading' | 'placeholder' | 'blurDataURL'
> & {
  circle?: boolean;
};

const shimmer = (w: ImageProps['width'], h: ImageProps['height']) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  canUseDOM ? window.btoa(str) : Buffer.from(str).toString('base64');

const buildBase64 = (width: ImageProps['width'], height: ImageProps['height']) =>
  toBase64(shimmer(width, height));

const schemaList = ['https', 'http'] as const;

type ImageParams = Pick<ImageLoaderProps, 'width' | 'quality'>;

const getImageParams = ({ width, quality }: ImageParams) =>
  `imageView2/2/w/${width}/interlace/1/q/${quality || 60}`;

/**
 * src如果以http、https开头添加额外参数src, 否则使用public下的文件
 */
const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const isAbsoluteUrl = schemaList.some(prefix => src.startsWith(prefix));
  return isAbsoluteUrl ? `${src}?${getImageParams({ width, quality })}` : src;
};

const MyImage = ({ className = '', circle, src: srcProp, ...rest }: MyImageProps) => {
  const placeholderProps: Pick<ImageProps, 'placeholder' | 'blurDataURL'> = {};
  const { width = 0, height = 0 } = rest;
  const [src, setSrc] = useState(srcProp);

  if (width > 40 || height > 40) {
    placeholderProps.placeholder = 'blur';
    placeholderProps.blurDataURL = `data:image/svg+xml;base64,${buildBase64(
      width,
      height
    )}`;
  }

  return (
    <Image
      {...rest}
      {...placeholderProps}
      src={src}
      loading='lazy'
      loader={imageLoader}
      className={classNames(className, {
        'rounded-full': circle,
      })}
      onError={() => {
        setSrc('https://static.itsuki.cn/avatar.jpg');
      }}
    />
  );
};

export default MyImage;
