import { SearchOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

const HeaderSearch = () => (
  <div className={styles.search}>
    <div className={styles.main}>
      <SearchOutlined className={styles.icon} />
      <input placeholder='搜索' />
    </div>
  </div>
);

export default HeaderSearch;
