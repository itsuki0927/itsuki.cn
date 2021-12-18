import styles from './style.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className='container'>
      Build by 🖐️ 🪵 🇨🇳 👨‍💻 🌈 🎈
      <a
        className={styles.link}
        href='https://beian.miit.gov.cn'
        target='_blank'
        rel='external nofollow noopener noreferrer'
      >
        湘ICP备2021020356号-1
      </a>
    </div>
  </footer>
);

export default Footer;
