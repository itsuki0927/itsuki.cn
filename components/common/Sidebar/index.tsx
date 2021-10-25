import Tag from './Tag';
import styles from './style.module.scss';
import Hello from './Hello';
import Music from './Music';
import LeaderBoard from './Leaderboard';
import { SiteInfo } from '@/entities/siteInfo';

interface SidebarProps {
  tags: SiteInfo['tags'];
}

const Sidebar = ({ tags = [] }: SidebarProps) => (
  <aside className={styles.sidebar}>
    <Hello />
    <Music />
    <Tag tags={tags} />
    <LeaderBoard />
  </aside>
);

export default Sidebar;
