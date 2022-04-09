import { CSSProperties } from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

const HeadsetSvg = (props: SvgProps) => (
  <svg
    className='icon'
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='8503'
    {...props}
  >
    <path
      d='M512 128c-212.1 0-384 171.9-384 384v360c0 13.3 10.7 24 24 24h184c35.3 0 64-28.7 64-64V624c0-35.3-28.7-64-64-64H200v-48c0-172.3 139.7-312 312-312s312 139.7 312 312v48H688c-35.3 0-64 28.7-64 64v208c0 35.3 28.7 64 64 64h184c13.3 0 24-10.7 24-24V512c0-212.1-171.9-384-384-384zM328 632v192H200V632h128z m496 192H696V632h128v192z'
      p-id='8504'
      className='fill-[#434343] dark:fill-basic--dark'
    />
  </svg>
);

export default HeadsetSvg;
