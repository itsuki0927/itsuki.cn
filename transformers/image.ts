import { ImageLoaderProps } from 'next/image';
import { RESOURCE_URL } from '@/configs/app';

const schemaList = ['https', 'http'];

type ImageParams = Pick<ImageLoaderProps, 'width' | 'quality'>;

const getImageParams = ({ width, quality }: ImageParams) =>
  `width=${width}&quality=${quality || 70}`;

/**
 * src如果以http、https开头则直接使用src, 否则拼接生成最终的url
 */
const imageTransformer = ({ src, width, quality }: ImageLoaderProps) => {
  const path = `${src}?${getImageParams({ width, quality })}`;
  const origin = schemaList.some(prefix => src.startsWith(prefix))
    ? ''
    : `${RESOURCE_URL}/`;
  const url = `${origin}${path}`;
  return url;
};

export default imageTransformer;
