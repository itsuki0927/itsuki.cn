import { FC } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '../Sidebar';
import styles from './style.module.scss';

const DynamicAffix = dynamic(() => import('@/components/Affix'), { ssr: false });

const Main: FC = ({ children }) => (
  <main className={styles.main}>
    <div className={styles.mainContent}>{children}</div>
    <DynamicAffix top={88}>
      <Sidebar />
    </DynamicAffix>
  </main>
);

export default Main;
