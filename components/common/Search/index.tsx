import { SearchOutlined } from '@ant-design/icons';
import { KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const HeaderSearch = () => {
  const router = useRouter();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      const { value } = e.currentTarget;
      if (value) {
        router.push(`/search/${value}`, undefined, { shallow: true });
      }
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.main}>
        <SearchOutlined className={styles.icon} />
        <input placeholder='搜索' onKeyUp={handleSearch} />
      </div>
    </div>
  );
};

export default HeaderSearch;
