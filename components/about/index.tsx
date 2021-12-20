import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';
import imageTransformer from '@/utils/image';
import {
  CodeSvg,
  Css3Svg,
  GithubSvg,
  HeadsetSvg,
  Html5Svg,
  JsSvg,
  JuejinSvg,
  MilkteaSvg,
  MovieSvg,
  ReactSvg,
  ReloadSvg,
  RunSvg,
  SifouSvg,
  VimSvg,
  VueSvg,
} from '@/components/svgs';
import styles from './style.module.scss';

const list = [
  <JsSvg width={50} height={50} />,
  <Css3Svg width={50} height={50} />,
  <Html5Svg width={50} height={50} />,
  <ReactSvg width={50} height={50} />,
  <VueSvg width={50} height={50} />,
  <VimSvg width={50} height={50} />,
];

const personProfile = [
  {
    label: 'Github',
    value: (
      <a
        rel='external nofollow noopener noreferrer'
        target='_blank'
        href='https://github.com/itsuki0927'
        className={`${styles.link} ${styles.github}`}
      >
        <GithubSvg width={16} height={16} />
        Github
      </a>
    ),
  },
  {
    label: '掘金',
    value: (
      <a
        rel='external nofollow noopener noreferrer'
        target='_blank'
        href='https://juejin.cn/user/2436173499466350'
        className={`${styles.link} ${styles.juejin}`}
      >
        <JuejinSvg width={16} height={16} />
        掘金
      </a>
    ),
  },
  {
    label: '思否',
    value: (
      <a
        rel='external nofollow noopener noreferrer'
        target='_blank'
        href='https://segmentfault.com/u/itsuki0927'
        className={`${styles.link} ${styles.sifou}`}
      >
        <SifouSvg width={16} height={16} />
        思否
      </a>
    ),
  },
];

const AboutView = () => (
  <div className={styles.about}>
    <NextSeo title='关于' />
    <div className={styles.profile}>
      <h1>
        Hi, 我是<strong style={{ color: '#1890ff' }}>五木</strong>, 英文名: itsuki,
        一名大四学生
        <div>准网易雷火前端工程师</div>
      </h1>

      <div className={styles.avatar}>
        <Image
          loader={imageTransformer}
          src='https://static.itsuki.cn/avatar1.jpg'
          width={280}
          height={280}
        />
      </div>
    </div>

    <h2>Why</h2>
    <section className={styles.description}>
      <div className={styles.spacing}>
        <h3>为什么是五木?</h3>
        <p>
          真名是 *森林 , 其实叫木木木木木好像更贴切一点, 但是两个字比五个字
          <strong>简短</strong>多了.
        </p>
      </div>
      <h3>为什么英文名是 itsuki ?</h3>
      <p>
        之前一直叫 fivewoods , 中文式英语, 懂得都懂, 有一次在大学计算机英语课上,
        老师要我们做一个英文的自我介绍,
        当时借用了一下同学的手机用谷歌翻译了一下五木的英文, 翻译过来就是 itsuki , 然后就从
        fivewoods -{`>`} itsuki, 一直用到了现在.
      </p>
    </section>

    <h2>简介</h2>
    <div className={styles.introduction}>
      <div className={styles.content}>
        <p>
          一名<strong>爱写代码</strong>和<strong>跑步</strong>的大四学生. 大学生活有五年,
          大专生三年+本科两年, 在大专生时加入了学校打比赛的协会, 参加了"蓝桥杯"比赛,
          在那里锻炼了算法以及学习能力, 后面因个人原因没有留在协会,
          在协会时知道自己算法能力不是很强, 选择了对算法要求没那么高的前端,
          那个时候Vue比较火, 就开始前端之路.
        </p>

        <p style={{ marginBottom: 0 }}>
          跑步是在无意之间接触到的, 当时想着跑步可以提升精气神,
          每天学累了就去跑跑步放松一下, 结果没想到上瘾了, 从三公里-{'>'}五公里-{'>'}
          十公里-{'>'}半马-{'>'}全马. 到本科学院因为跑步结识了现在的朋友,
          现在每天5.20公里, 不管刮风还是下雨 , 或许这就是跑步人的浪漫吧❤️❤️ .
        </p>
      </div>

      <div className={styles.wechatCode}>
        <Image
          loader={imageTransformer}
          src='https://static.itsuki.cn/app/wechat.jpeg'
          width={180}
          height={180}
          objectFit='cover'
        />
      </div>
    </div>

    <h2>其他</h2>
    <div className={styles.banner}>
      <div className={styles.socialContact}>
        <h3>社区</h3>
        {personProfile.map(item => (
          <div className={styles.item}>{item.value}</div>
        ))}
      </div>

      <div className={styles.skill}>
        <h3>技能</h3>
        {list.map(item => (
          <>{item}</>
        ))}
      </div>
    </div>

    <h2>爱好</h2>
    <div className={styles.like}>
      <div className={styles.item}>
        <CodeSvg width={36} height={36} />
        <h3 className={styles.title}>代码</h3>

        <span>从精通到入门: Code 👨‍💻</span>
      </div>

      <div className={styles.item}>
        <RunSvg width={36} height={36} />
        <h3 className={styles.title}>跑步</h3>

        <span>《强风吹拂》: 纵使疾风起, 人生不言弃 🏃</span>
      </div>

      <div className={styles.item}>
        <MovieSvg width={36} height={36} />
        <h3 className={styles.title}>电影</h3>

        <span>豆瓣 Top250 部看了一半了, 继续加油 🎬</span>
      </div>

      <div className={styles.item}>
        <HeadsetSvg width={36} height={36} />
        <h3 className={styles.title}>音乐</h3>

        <span>网抑云10级, 音乐是我的另一个世界 🎧</span>
      </div>

      <div className={styles.item}>
        <MilkteaSvg width={36} height={36} />
        <h3 className={styles.title}>奶茶</h3>

        <span>嘿, 你要不要喝奶茶?🥤</span>
      </div>

      <div className={styles.item}>
        <ReloadSvg width={36} height={36} />
        <h3 className={styles.title}>加载</h3>

        <span>绞尽脑汁, 发现只有这么几个爱好, 后面想起来再补, 🔚</span>
      </div>
    </div>

    <h2>感慨</h2>
    <div className={styles.more}>
      <strong>一个应用要写好太难了, 即使是博客!!!</strong>
    </div>
  </div>
);

export default AboutView;
