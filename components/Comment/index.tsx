import { postComment } from '@/api/comment';
import Card from '../Card';
import Editor from '../Editor';

type CommentProps = {
  title: string;
};

const Comment = ({ title }: CommentProps) => {
  return (
    <Card title={title}>
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

export default Comment;
