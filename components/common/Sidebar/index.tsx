import { SiteInfo } from '@/entities/siteInfo';
import Hello from './Hello';
import LeaderBoard from './Leaderboard';
import Snippet from './Snippet';
import styles from './style.module.scss';
import Tag from './Tag';

interface SidebarProps {
  tags: SiteInfo['tags'];
}

const Sidebar = ({ tags = [] }: SidebarProps) => (
  <aside className={styles.sidebar}>
    <Hello />
    <Snippet />
    <Tag tags={tags} />
    <LeaderBoard />
  </aside>
);

export default Sidebar;
