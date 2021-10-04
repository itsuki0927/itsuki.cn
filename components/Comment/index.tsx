import { postComment } from '@/api/comment';
import { Comment } from '@/entities/comment';
import Card from '../Card';
import Editor from '../Editor';
import CommentCard from './Item';

type CommentProps = {
  title: string;
  comments: Comment[];
};

const CommentList = ({ title, comments }: CommentProps) => {
  return (
    <Card title={title}>
      {comments?.map(item => {
        return <CommentCard comment={item} key={item.id} />;
      })}
      <Editor
        onSend={data => {
          return postComment(data).then(data => {
            console.log('data:', data);
            return true;
          });
        }}
      />
    </Card>
  );
};

export default CommentList;
