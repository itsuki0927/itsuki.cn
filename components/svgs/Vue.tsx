import { CSSProperties } from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}
const VueSvg = (props: SvgProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='4835'
    {...props}
  >
    <path
      d='M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z'
      fill='#41B883'
      p-id='4836'
    />
    <path
      d='M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z'
      fill='#34495E'
      p-id='4837'
    />
  </svg>
);

export default VueSvg;
