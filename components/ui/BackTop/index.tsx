import { ToTopOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui';
import styles from './style.module.scss';

const BackTop = () => {
  const backToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 5) {
      requestAnimationFrame(backToTop);
      window.scrollTo(0, c - c / 8);
    } else if (c > 0) {
      requestAnimationFrame(backToTop);
      window.scrollTo(0, c - 1);
    }
  };

  return (
    <div className={styles.backTop}>
      <Button icon={<ToTopOutlined />} onClick={backToTop}>
        回到顶部
      </Button>
    </div>
  );
};

export default BackTop;
