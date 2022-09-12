import classNames from 'classnames';
import styles from './index.module.scss';

interface ToolProps {
  mask: string;
  img: string;
  name: string;
  description: string;
}

const Tool = ({ mask, name, description, img }: ToolProps) => (
  <div className={classNames(styles.tool, styles[name.toLowerCase()])}>
    <div className={styles.icon}>
      <div
        className={styles.icon1}
        style={{
          maskImage: `url(${mask})`,
          WebkitMaskImage: `url(${mask})`,
        }}
      />
      <img className={styles.icon2} src={img} alt={name} />
    </div>
    <div className={styles.desc}>
      <div className={styles.inner}>
        <strong>{name}</strong>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const tools: ToolProps[] = [
  {
    mask: '/tool/nvim.png',
    img: '/tool/nvim-2.png',
    name: 'Neovim',
    description: '一个类似于vscode的nvim ide',
  },
  {
    mask: '/tool/figma.png',
    img: '/tool/figma-2.png',
    name: 'Figma',
    description: '五块木头博客的UI设计地(借鉴)',
  },
  {
    mask: '/tool/github.png',
    img: '/tool/github-2.png',
    name: 'Github',
    description: '使用Github管理所有的代码',
  },
  {
    mask: '/tool/unsplash.png',
    img: '/tool/unsplash-2.png',
    name: 'Unsplash',
    description: '博客 80% 的图片都来源于此',
  },
  {
    mask: '/tool/transmit.png',
    img: '/tool/transmit-2.png',
    name: 'Transmit',
    description: '使用原始的FTP软件 + 命令行',
  },
  {
    mask: '/tool/idea.png',
    img: '/tool/idea-2.png',
    name: 'IDEA',
    description: '牛逼的重型IDE',
  },
];

const ToolList = () => (
  <div className='mt-8 flex justify-between'>
    {tools.map(tool => (
      <Tool {...tool} key={tool.name} />
    ))}
  </div>
);

export default ToolList;
