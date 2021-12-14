import { Card } from '@/components/ui';
import styles from './style.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <Card bodyStyle={{ padding: '16px' }}>
      <div className='container'>
        <span>Made with</span>
        <span>❤️</span>
        <span>by</span>
        Itsuki
        <a
          className={styles.link}
          href='https://beian.miit.gov.cn'
          target='_blank'
          rel='noreferrer'
        >
          湘ICP备2021020356号-1
        </a>
      </div>
    </Card>
  </footer>
);

export default Footer;
