import { postComment } from '@/api/comment';
import { parseUA } from 'transformers/ua';
import Card from '../Card';
import Editor from '../Editor';
import CommentCard from './Item';

type CommentProps = {
  title: string;
  comments: any[];
};

const Comment = ({ title, comments }: CommentProps) => {
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

export default Comment;
