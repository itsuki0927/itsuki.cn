import router from 'next/router';
import { Icon } from '@/components/icons';
import { Tag as TagType } from '@/entities/tag';
import { getExpandValue } from '@/utils/expands';
import { IconButton } from '@/components/ui';
import { ButtonProps } from '@/components/ui/Button';

export const getIconValue = (expand: string) => getExpandValue(expand, 'icon');

interface ArticleTagProps extends ButtonProps {
  tag: TagType;
}
const ArticleTag = ({ tag, ...rest }: ArticleTagProps) => (
  <IconButton
    type='ghost'
    size='small'
    icon={tag.expand && <Icon name={getIconValue(tag.expand)} />}
    onClick={() => router.push(`/tag/${tag.name}`)}
    {...rest}
  >
    {tag.name}
  </IconButton>
);

export default ArticleTag;
