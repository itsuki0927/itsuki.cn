import { ICONFONT_URL } from "@/configs/app";
import { createFromIconfontCN } from "@ant-design/icons";
import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";

const IconBuilder = createFromIconfontCN({
  scriptUrl: ICONFONT_URL,
});

type IconProps = Omit<IconComponentProps, "type"> & {
  name: string;
};

const Icon = ({ name, ...rest }: IconProps) => {
  return <IconBuilder type={`icon-${name}`} {...rest} />;
};
export default Icon;
