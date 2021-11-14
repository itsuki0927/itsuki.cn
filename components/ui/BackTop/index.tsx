import { ToTopOutlined } from '@/components/icons';
import { Button } from '@/components/ui';
import { scrollTo } from '@/utils/index';
import styles from './style.module.scss';

const BackTop = () => {
  const backToTop = () => scrollTo(0, 600);

  return (
    <div className={styles.backTop}>
      <Button icon={<ToTopOutlined />} onClick={backToTop}>
        回到顶部
      </Button>
    </div>
  );
};

export default BackTop;
