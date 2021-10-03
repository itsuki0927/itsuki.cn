import Button from '@/components/Button';
import Card from '@/components/Card';
import AppContext from '@/utils/context';
import { AndroidOutlined } from '@ant-design/icons';
import { useContext } from 'react';

const SidebarTag = () => {
  const context = useContext(AppContext);

  return (
    <Card title='Tag'>
      {context?.tags?.map(item => (
        <Button
          key={item.id}
          icon={<AndroidOutlined />}
          size='small'
          style={{ marginBottom: 12 }}
        >
          {item.name}
        </Button>
      ))}
    </Card>
  );
};

export default SidebarTag;
