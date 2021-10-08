import { createFromIconfontCN } from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { ICONFONT_URL } from '@/configs/app';

const IconBuilder = createFromIconfontCN({
  scriptUrl: ICONFONT_URL,
});

type IconProps = Omit<IconComponentProps, 'type'> & {
  name: string;
};

const Icon = ({ name, ...rest }: IconProps) => (
  <IconBuilder type={`icon-${name}`} {...rest} />
);
export default Icon;
