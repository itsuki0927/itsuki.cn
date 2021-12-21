import { CSSProperties } from 'react';

interface SvgProps {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  className?: string;
}

const SifouSvg = (props: SvgProps) => (
  <svg
    viewBox='0 0 1024 1024'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    p-id='1532'
    {...props}
  >
    <path
      d='M248.83399566 943.35207538c-37.14984163-5.00781966-73.59961088-14.5226752-99.63004928-26.02532864C109.7137152 899.88113977 72.53832363 875.11798557 72.53832363 866.24699165c0-4.12378567 5.74877241-17.68066731 12.77504853-30.12867528l25.66762837-45.45362375 12.8925787-22.83156707 26.71007176 20.31743772c28.99425053 22.04973397 69.56780544 39.38803029 102.84936306 43.94616832 49.36278813 6.76566585 89.93634304-20.47584825 89.93634304-60.38510137 0-27.66564579-18.15589888-44.08413867-72.6849172-65.74040064-57.69722994-22.90821689-89.05231019-38.76971747-117.1829669-59.27111566-83.37507783-60.75813205-84.02405035-195.09032391-1.25195491-258.70495744 69.11301405-53.11354311 209.25529771-58.94407509 309.9277915-12.89768846 24.68139463 11.28803328 34.49263104 18.49827101 34.49263218 25.34058667 0 12.16184661-45.22367203 102.67562211-50.04753123 100.17171228-60.60994105-31.48282994-104.03999744-43.05191367-140.86279738-37.52798322-41.86127929 6.27510386-60.94209251 33.52172771-46.940639 67.03323591 8.47241216 20.27655737 19.60203491 27.04222322 87.10539264 52.96024121 92.44025287 35.48908544 125.18014749 58.48928256 149.77467051 105.22041116 11.78370503 22.38188544 13.45468189 31.56970041 13.47512206 74.09528264 0.02044018 39.63842105-2.11043783 53.23107328-11.59974457 74.09528263-21.46208199 47.1552603-66.17986275 81.85740174-125.89555029 97.67802311-27.36415403 7.25622784-97.98973326 12.5348773-122.84486884 9.18781497z m390.91649195-237.04358457V481.33988352h-71.54027292V358.69941533h70.6766791l1.79872655-85.59282632c2.10532807-100.37100317 9.21336491-123.44274034 49.69493959-161.30798592 34.0480603-31.8456411 66.19519203-41.87149995 133.33062884-41.58533859 63.87524381 0.27594069 127.75048761 16.35206258 127.7504876 32.15224263 0 5.00781966-6.98028715 28.50879829-15.50890894 52.23462002-8.53373269 23.72071083-16.47981341 45.93396509-17.66022713 49.35256746-1.64542578 4.75231801-6.39774493 4.44571648-20.09770667-1.27750485-9.86744718-4.12378567-28.36571819-7.49639907-41.10499726-7.49639794-41.65687865 0-53.74207545 24.97266574-53.78806556 111.14292338L803.27111111 358.69941533h112.42042937v122.64046819h-112.25179819l1.19063438 223.56335275 1.19574415 223.56335274-83.03781661 1.40525454-83.0378166 1.40525568z'
      p-id='1533'
      fill='#f5f5f5'
    />
  </svg>
);

export default SifouSvg;