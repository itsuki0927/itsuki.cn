import Card from '@/components/Card';
import styles from './style.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <Card bordered={false} bodyStyle={{ padding: '16px' }}>
      <div className={styles.container}>
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
          湘ICP备19011111号-1
        </a>
      </div>
    </Card>
  </footer>
);

export default Footer;
