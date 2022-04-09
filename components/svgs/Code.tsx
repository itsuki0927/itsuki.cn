import { CSSProperties } from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

const CodeSvg = ({ width = 100, height = 100, ...rest }: SvgProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='3045'
    width={width}
    height={height}
    {...rest}
  >
    <path
      d='M547.36678517 216.92294637l74.90198521 20.55726816-160.67809068 585.5455502-74.90198399-20.55726695 160.67808946-585.54555141zM289.90901453 253.09234608l54.47417006 55.35445569-212.82209184 209.45629275 212.43373036 203.37196207-53.72333867 56.10528949L20.07545719 518.67981748 289.90901453 253.09234608z m431.90974813 0l269.83355733 265.5874714L721.45629275 777.38034608l-53.72333867-56.10528949 212.40784-203.37196207L667.34459259 308.44680177 721.81876266 253.09234608z'
      p-id='3046'
      className='fill-[#434343] dark:fill-basic--dark'
    />
  </svg>
);

export default CodeSvg;
