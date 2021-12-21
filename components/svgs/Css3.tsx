import { CSSProperties } from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

const Css3Svg = (props: SvgProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='2559'
    {...props}
  >
    <path
      d='M140.34821433 90.125h743.30357134l-60.26785703 763.39285675-301.33928594 80.35714325-301.33928596-80.35714325z'
      fill='#0070BA'
      p-id='2560'
    />
    <path
      d='M522.0446427 150.39285703h301.33928594l-40.17857161 662.94642892-261.16071433 60.26785702V150.39285703z'
      fill='#148DCE'
      p-id='2561'
    />
    <path
      d='M321.1517854 351.28571433l-17.27678567-100.44642866H743.0267854l-38.37053567 462.05357163-172.96875 60.26785703-192.25446406-40.17857163-19.08482161-160.71428568h96.02678621v80.35714325l115.31249946 20.0892854 96.02678622-20.0892854v-120.53571487H320.34821405s-3.81696433-34.2522323-8.03571432-95.16294607C310.10267893 404.52232163 622.49107136 431.64285674 622.49107136 431.64285674v-80.35714241H321.1517854z'
      fill='#FFFFFF'
      p-id='2562'
    />
  </svg>
);

export default Css3Svg;