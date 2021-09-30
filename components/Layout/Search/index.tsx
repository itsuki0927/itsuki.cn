import styles from './style.module.scss';

const HeaderSearch = () => {
  return (
    <div className={styles.search}>
      <div className={styles.main}>
        <i className={`iconfont icon-search ${styles.icon}`}></i>
        <input placeholder='搜索' />
      </div>
    </div>
  );
};

export default HeaderSearch;
