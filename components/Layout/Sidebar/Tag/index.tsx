import Button from '@/components/Button';
import Card from '@/components/Card';
import AppContext from '@/utils/context';
import { AndroidOutlined } from '@ant-design/icons';
import router from 'next/router';
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
        <Button
          type='dashed'
          key={item.id}
          icon={<AndroidOutlined />}
          size='small'
          style={buttonStyle}
          onClick={() => router.push(`/tag/${item.name}`)}
        >
          {item.name}
        </Button>
      ))}
    </Card>
  );
};

export default SidebarTag;
