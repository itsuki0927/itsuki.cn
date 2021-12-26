import { ToTopOutlined } from '@/components/icons';
import { IconButton } from '@/components/ui';
import scrollTo from '@/utils/scrollTo';
import styles from './style.module.scss';

const BackTop = () => {
  const backToTop = () => scrollTo(0, 600);

  return (
    <div className={styles.backTop}>
      <IconButton
        icon={<ToTopOutlined />}
        onClick={backToTop}
        type='ghost'
        style={{ background: '#fff' }}
      />
    </div>
  );
};

export default BackTop;
