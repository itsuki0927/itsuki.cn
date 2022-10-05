import s from './style.module.css';

const LoadingDots: React.FC = () => (
  <span className={s.root}>
    <span className={s.dot} key='dot_1' />
    <span className={s.dot} key='dot_2' />
    <span className={s.dot} key='dot_3' />
  </span>
);

export default LoadingDots;
