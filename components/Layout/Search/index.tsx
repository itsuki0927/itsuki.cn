import Icon from '@/components/Icon';
import styles from './style.module.scss';

const HeaderSearch = () => {
  return (
    <div className={styles.search}>
      <div className={styles.main}>
        <Icon name='search' className={styles.icon} />
        <input placeholder='搜索' />
      </div>
    </div>
  );
};

export default HeaderSearch;
