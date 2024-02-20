import Image, { type ImageProps } from 'next/image';

const shimmer = (w: ImageProps['width'], h: ImageProps['height']) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#ccc" offset="20%" />
      <stop stop-color="#eee" offset="50%" />
      <stop stop-color="#ccc" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window !== 'undefined'
    ? window.btoa(str)
    : Buffer.from(str).toString('base64');

const buildBase64 = (
  width: ImageProps['width'],
  height: ImageProps['height'],
) => toBase64(shimmer(width, height));

type MyImageProps = Omit<ImageProps, 'placeholder'>;

const getNumber = (n: number | `${number}` = 0) => {
  if (typeof n === 'number') {
    return n;
  }
  return Number(n.replace('${', '').replace('}', ''));
};

const MyImage = (props: MyImageProps) => {
  const placeholderProps: Pick<ImageProps, 'placeholder'> = {};
  if (getNumber(props.width) > 40 || getNumber(props.height) > 40) {
    placeholderProps.placeholder = `data:image/svg+xml;base64,${buildBase64(
      props.width || 700,
      props.height || 475,
    )}`;
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} {...placeholderProps} />
  );
};

export default MyImage;
