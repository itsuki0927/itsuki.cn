import { Tag as TagType } from '@/entities/tag';
import router from 'next/router';
import { getExpandsValue } from '../Banner/util';
import Button, { ButtonProps } from '../Button';
import Icon from '../Icon';

export const getIconValue = (expand: string) => getExpandsValue(JSON.parse(expand), 'icon');

type TagProps = {
  tag: TagType;
  buttonProps?: ButtonProps;
};
const Tag = ({ tag, buttonProps }: TagProps) => {
  return (
    <Button
      type='dashed'
      size='small'
      icon={tag.expand && <Icon name={getIconValue(tag.expand)} />}
      onClick={() => router.push(`/tag/${tag.name}`)}
      {...buttonProps}
    >
      {tag.name}
    </Button>
  );
};

export default Tag;
