import { CSSProperties } from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

const JsSvg = (props: SvgProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='2559'
    {...props}
  >
    <path
      d='M102.4 102.4h819.2v819.2H102.4V102.4m215.2675552 684.48711147c18.2044448 38.6844448 54.15822187 70.54222187 115.59822293 70.54222186 68.26666667 0 115.14311147-36.40888853 115.1431104-116.05333333v-263.05422187h-77.36888853V739.5555552c0 39.1395552-15.92888853 49.152-40.96 49.152-26.3964448 0-37.31911147-18.2044448-49.60711147-39.59466667l-62.80533333 37.77422294m272.1564448-8.192c22.7555552 44.60088853 68.72177813 78.73422187 140.62933333 78.73422186 72.81777813 0 127.43111147-37.77422187 127.43111147-107.40622186 0-64.17066667-36.864-92.84266667-102.4-121.05955627l-19.11466667-8.192c-33.22311147-14.1084448-47.3315552-23.66577813-47.33155626-46.42133333 0-18.6595552 14.1084448-33.22311147 36.864-33.2231104 21.84533333 0 36.40888853 9.55733333 49.60711146 33.2231104l59.6195552-39.59466667c-25.03111147-43.69066667-60.52977813-60.52977813-109.22666666-60.52977707-68.72177813 0-112.8675552 43.69066667-112.8675552 101.48977707 0 62.80533333 36.864 92.3875552 92.3875552 116.05333333l19.11466666 8.192c35.49866667 15.47377813 56.43377813 25.03111147 56.43377814 51.42755627 0 21.84533333-20.48 37.77422187-52.33777814 37.77422187-37.77422187 0-59.6195552-19.56977813-76.0035552-46.8764448l-62.80533333 36.4088896z'
      fill='#f6d854'
      p-id='2560'
    />
  </svg>
);

export default JsSvg;