import MyImage from '@/components/common/MyImage';
import clsx from 'clsx';
import { Sword } from 'lucide-react';
import HomeCard from './HomeCard';
import styles from './index.module.scss';
import ExternalLink from '@/components/common/ExternalLink';

interface ToolProps {
  mask: string;
  img: string;
  name: string;
  description: string;
  url: string;
}

const Tool = ({ mask, name, description, img }: ToolProps) => (
  <div className={clsx(styles.tool, styles[name.toLowerCase()])}>
    <div className={styles.icon}>
      <div
        className={styles.icon1}
        style={{
          maskImage: `url(${mask})`,
          WebkitMaskImage: `url(${mask})`,
        }}
      />
      <MyImage className={styles.icon2} src={img} alt={name} fill />
    </div>
    <div className={styles.content}>
      <p className={styles.title}>{name}</p>
      <p className={styles.desc}>{description}</p>
    </div>
  </div>
);

const tools: ToolProps[] = [
  {
    mask: '/tool/github.png',
    img: '/tool/github-2.png',
    name: 'Github',
    description: '源代码就在这里',
    url: 'https://github.com/itsuki0927/itsuki.cn',
  },
  {
    mask: '/tool/notion.png',
    img: '/tool/notion-2.png',
    name: 'Notion',
    description: '内容创作',
    url: 'https://www.notion.so/',
  },
  {
    mask: '/tool/nvim.png',
    img: '/tool/nvim-2.png',
    name: 'Neovim',
    description: 'nvim 爱好者',
    url: 'https://github.com/itsuki0927/SkCode',
  },
  {
    mask: '/tool/figma.png',
    img: '/tool/figma-2.png',
    name: 'Figma',
    description: 'UI设计',
    url: 'https://www.figma.com/',
  },
  {
    mask: '/tool/unsplash.png',
    img: '/tool/unsplash-2.png',
    name: 'Unsplash',
    description: '免费又好看~',
    url: 'https://unsplash.com/',
  },
  {
    mask: '/tool/idea.png',
    img: '/tool/idea-2.png',
    name: 'IDEA',
    description: '偶尔写写 Java',
    url: 'https://www.jetbrains.com/idea/',
  },
];

const Uses = () => {
  return (
    <HomeCard
      title={
        <>
          <Sword size={20} />
          <span className="ml-2">工具</span>
        </>
      }
    >
      <div className="mt-8 grid sm:grid-cols-3 gap-2 grid-cols-2">
        {tools.map((tool) => (
          <ExternalLink
            key={tool.name}
            href={tool.url}
            className="!no-underline"
          >
            <Tool {...tool} />
          </ExternalLink>
        ))}
      </div>
    </HomeCard>
  );
};

export default Uses;
