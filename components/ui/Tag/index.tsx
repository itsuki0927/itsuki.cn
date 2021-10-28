import router from 'next/router';
import { Icon } from '@/components/icons';
import { Tag as TagType } from '@/entities/tag';
import { getExpandsValue } from '../Banner/util';
import Button, { ButtonProps } from '@/components/ui/Button';

export const getIconValue = (expand: string) =>
  getExpandsValue(JSON.parse(expand), 'icon');

type TagProps = {
  tag: TagType;
  buttonProps?: ButtonProps;
};
const Tag = ({ tag, buttonProps }: TagProps) => (
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

export default Tag;
