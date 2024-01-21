import type { CSSProperties } from 'react';

interface SvgProps {
  size?: number;
  style?: CSSProperties;
  className?: string;
}

const Juejin = ({ size, ...rest }: SvgProps) => (
  <svg
    height={size}
    version="1.1"
    viewBox="0 0 1024 1024"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M894.19207122-5008.52509693m-611.50731392 7e-8a611.50731619 611.50731619 0 1 0 1223.0146301 0 611.50731619 611.50731619 0 1 0-1223.0146301 0Z"
      fill="rgba(31, 127, 255, 1)"
    />
    <path
      d="M726.02756127 298.32437665l76.43841421 76.43841422-282.82213359 214.02756126-282.82213361-214.02756126 76.43841424-76.43841422 206.38371937 145.23298893 206.38371938-145.23298893z m175.80835181 168.16451225l76.43841423 68.79457236 7.64384191 7.6438419-458.63048545 351.61670593-458.63048772-351.61670593 76.43841421-76.43841426 382.19207351 275.17829172 374.54822931-275.17829172z m-382.19207119-359.26054782l114.65762134 114.65762135-114.65762134 76.43841422-114.65762134-76.43841422 114.65762134-114.65762135z"
      fill="rgba(31, 127, 255, 1)"
    />
    <path
      d="M1620.26747286-3018.90540247L934.1971313-3704.97574398H-596.26747286v2216.53494571h2216.53494572V-3018.90540247zM-437.94354866-1646.76472254V-3546.65181977h1308.81110965l591.07598767 591.07598764V-1646.76472254H-437.94354866z"
      fill="rgba(31, 127, 255, 1)"
    />
  </svg>
);

export default Juejin;
