import { CSSProperties } from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

const Html5Svg = (props: SvgProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='2703'
    {...props}
  >
    <path
      d='M220.52 848.42L153.2 93.2h739.74L825.62 848 522.44 932'
      fill='#E44D26'
      p-id='2704'
    />
    <path d='M523.04 867.8V155.18h302.4l-57.72 644.28' fill='#F16529' p-id='2705' />
    <path
      d='M290.6 247.58h232.44v92.52H392.18l8.58 94.8h122.28v92.4H315.92m4.08 46.5h93l6.48 73.98 103.56 27.72v96.6l-190.02-52.98'
      fill='#EBEBEB'
      p-id='2706'
    />
    <path
      d='M754.7 247.58H522.68v92.52h223.44m-8.4 94.8H522.74v92.58h114.18l-10.8 120.3-103.38 27.72v96.24l189.6-52.62'
      fill='#FFFFFF'
      p-id='2707'
    />
  </svg>
);

export default Html5Svg;
