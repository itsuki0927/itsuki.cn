import { Tag as ArticleTag } from '@/entities/tag';
import Tag from '.';

interface TagListProps {
  tags: ArticleTag[];
  className?: string;
}

const TagList = ({ tags, className = '' }: TagListProps) => (
  <div className={`flex ${className}`}>
    {tags.map(tag => (
      <Tag tag={tag} key={tag.id} />
    ))}
  </div>
);

export default TagList;
