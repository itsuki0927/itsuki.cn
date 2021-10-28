import styles from './style.module.scss';

const InternalServerErrorView = () => (
  <div className={styles.serverError}>
    <h1 className={styles.head}>Internal Server Error</h1>
  </div>
);

export default InternalServerErrorView;
