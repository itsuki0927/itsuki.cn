import { NextSeo } from 'next-seo';
import React from 'react';
import { Card } from '../ui';
import styles from './style.module.scss';

const personProfile = [
  { label: '姓名: ', value: 'itsuki 五木' },
  {
    label: '简介: ',
    value: ` 一个四非的在校大四学生, 平时喜欢写写代码、跑跑步、看看电影啥的,
            没有其他的兴趣爱好了, 网易雷火准前端工程师`,
  },
  { label: '标签: ', value: '逗比、代码' },
  { label: '擅长: ', value: 'JavaScript、Css、React、Vue等前端开发技术' },
  {
    label: 'Github: ',
    value: (
      <a
        rel='external nofollow noopener noreferrer'
        target='_blank'
        href='https://github.com/itsuki0927'
      >
        点这里
      </a>
    ),
  },
];

const websiteInfo = [
  {
    label: '前端技术: ',
    value: 'Next.js + Swr',
  },

  {
    label: '后端技术: ',
    value: 'SpringBoot + SpringDataJpa + Mysql',
  },

  {
    label: '后台管理: ',
    value: 'AntdPro + ProComponents',
  },
  {
    label: '原型设计: ',
    value: 'Antd Design 风格',
  },
];

const AboutView = () => (
  <div className={styles.about}>
    <NextSeo title='关于' />
    <Card title='个人信息' style={{ marginBottom: 24 }}>
      {personProfile.map(item => (
        <div className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </Card>
    <Card title='网站信息'>
      {websiteInfo.map(item => (
        <div className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </Card>
  </div>
);

export default AboutView;
