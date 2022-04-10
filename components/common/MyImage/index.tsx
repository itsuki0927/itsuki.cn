import classNames from 'classnames';
import Image, { ImageProps } from 'next/image';
import imageTransformer from '@/utils/image';
import s from './style.module.css';

export type MyImageProps = Omit<ImageProps, 'loader'> & {
  imgClassName?: string;
};

const MyImage = ({ className, imgClassName, ...rest }: MyImageProps) => (
  <figure className={classNames(s.root, className)}>
    <Image {...rest} className={imgClassName} loader={imageTransformer} />
  </figure>
);

export default MyImage;
