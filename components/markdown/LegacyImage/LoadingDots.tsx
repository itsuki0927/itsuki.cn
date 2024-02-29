import s from './style.module.css';

const LoadingDots = () => (
  <span className={s.loadingDots}>
    <span className={s.dot} key="dot_1" />
    <span className={s.dot} key="dot_2" />
    <span className={s.dot} key="dot_3" />
  </span>
);

export default LoadingDots;
