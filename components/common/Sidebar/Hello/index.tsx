import { CommentProfileType } from '@/components/comment/CommentForm';
import { Card } from '@/components/ui';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import useLocalStorage from '@/hooks/useLocalStorage';
import { zhDayName } from '@/transformers/date';
import styles from './style.module.scss';

const Hello = () => {
  const [commentProfile] = useLocalStorage<CommentProfileType>(
    USER_COMMENT_PROFILE,
    initialCommentProfile
  );
  return (
    <Card className={styles.hello}>
      今天
      {zhDayName(new Date())},{' '}
      <span className={styles.nickname}>
        <strong>{commentProfile.nickname || '旅客'}</strong>
      </span>
    </Card>
  );
};

export default Hello;
