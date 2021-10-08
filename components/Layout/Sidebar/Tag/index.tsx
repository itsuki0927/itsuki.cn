import Card from '@/components/Card';
import Tag from '@/components/Tag';
import AppContext from '@/utils/context';
import { useContext } from 'react';

const buttonStyle = {
  marginBottom: 12,
};

const cardBodyStyle = {
  paddingBottom: 12,
};

const SidebarTag = () => {
  const context = useContext(AppContext);

  return (
    <Card title='Tag' bodyStyle={cardBodyStyle}>
      {context?.tags?.map(item => (
        <Tag key={item.id} buttonProps={{ style: buttonStyle }} tag={item} />
      ))}
    </Card>
  );
};

export default SidebarTag;
