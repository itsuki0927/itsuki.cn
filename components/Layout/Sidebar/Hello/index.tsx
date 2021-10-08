import Card from '@/components/Card';
import { CommentProfileType } from '@/components/Comment/Editor/Profile';
import { USER_COMMENT_PROFILE, initialCommentProfile } from '@/constants/comment';
import useLocalStorage from '@/hooks/useLocalStorage';
import { zhDayName } from '@/transformers/date';
import styles from './style.module.scss';

const Hello = () => {
  const [commentProfile] = useLocalStorage<CommentProfileType>(
    USER_COMMENT_PROFILE,
    initialCommentProfile
  );
  return (
    <Card className={styles.hello} bodyStyle={{ padding: '12px 24px' }}>
      今天
      {zhDayName(new Date())},{' '}
      <span className={styles.nickname}>
        <strong>{commentProfile.nickname || '旅客'}</strong>
      </span>
    </Card>
  );
};

export default Hello;
