import { ImageLoaderProps } from 'next/image';
import { RESOURCE_URL } from '@/configs/app';

const imageTransformer = ({ src, width, quality }: ImageLoaderProps) =>
  `${RESOURCE_URL}/${src}?width=${width}&quality=${quality || 70}`;

export default imageTransformer;
