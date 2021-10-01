import Tag from './Tag';
import styles from './style.module.scss';
import Hello from './Hello';
import Music from './Music';
import LeaderBoard from './Leaderboard';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Hello />
      <Music />
      <Tag />
      <LeaderBoard />
    </aside>
  );
};

export default Sidebar;
