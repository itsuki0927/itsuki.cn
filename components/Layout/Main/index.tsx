import classNames from 'classnames';
import { FC } from 'react';
import Sidebar from '../Sidebar';
import styles from './style.module.scss';

const Main: FC = ({ children }) => {
  return (
    <main className={classNames('container', styles.main)}>
      <div className={styles.mainContent}>{children}</div>
      <Sidebar />
    </main>
  );
};

export default Main;
