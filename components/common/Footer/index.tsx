const Footer = () => (
  <footer className='h-20 bg-[#ffffff80] px-4 text-sm leading-[80px] text-gray-2 backdrop-blur-[2px] backdrop-saturate-150 dark:bg-[#0d0d1050]'>
    <div className='container text-center tracking-wider'>
      Build by {'  '}
      <span
        className='transition-colors hover:text-basic '
        // href='https://github.com/itsuki0927/blog-web'
        // target='_blank'
        // rel='external nofollow noopener noreferrer'
      >
        Next.JS
      </span>{' '}
      、
      <span
        className='transition-colors hover:text-basic '
        // href='https://github.com/itsuki0927/blog-server'
        // target='_blank'
        // rel='external nofollow noopener noreferrer'
      >
        SpringBoot
      </span>
      <span className='mx-2'>|</span>
      <a
        className='transition-colors hover:text-basic '
        href='https://beian.miit.gov.cn'
        target='_blank'
        rel='external nofollow noopener noreferrer'
      >
        湘ICP备2021020356号
      </a>
      <span className='mx-2'>|</span>
      <span>Copyright © Itsuki's Blog 2022</span>
    </div>
  </footer>
);

export default Footer;
