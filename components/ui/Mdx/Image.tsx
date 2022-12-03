/* eslint-disable react/destructuring-assignment */
import classNames from 'classnames';
import MyImage, { MyImageProps } from '@/components/common/MyImage';

const Image = (props: MyImageProps) => {
  return (
    <figure className='mx-0 mb-9'>
      <MyImage
        {...props}
        className={classNames('mx-auto', props.className)}
        quality={50}
      />
      <figcaption className='pt-2 text-center text-sm leading-6 text-gray-500'>
        {props.alt}
      </figcaption>
    </figure>
  );
};

export default Image;
