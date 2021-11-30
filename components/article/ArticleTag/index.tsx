import router from 'next/router';
import { Icon } from '@/components/icons';
import { Tag as TagType } from '@/entities/tag';
import { getExpandValue } from '@/transformers/expands';
import Button, { ButtonProps } from '@/components/ui/Button';

export const getIconValue = (expand: string) => getExpandValue(expand, 'icon');

type ArticleTagProps = {
  tag: TagType;
  buttonProps?: ButtonProps;
};
const ArticleTag = ({ tag, buttonProps }: ArticleTagProps) => (
  <Button
    type='dashed'
    size='small'
    icon={
      tag.expand && <Icon style={{ marginRight: 6 }} name={getIconValue(tag.expand)} />
    }
    onClick={() => router.push(`/tag/${tag.name}`)}
    {...buttonProps}
  >
    {tag.name}
  </Button>
);

export default ArticleTag;
