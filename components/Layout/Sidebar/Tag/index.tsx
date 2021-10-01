import Button from '@/components/Button';
import { AppleOutlined, AndroidOutlined, WindowsOutlined, IeOutlined } from '@ant-design/icons';
import Card from '@/components/Card';

const Tag = () => {
  return (
    <Card title='Tag' style={{ width: 320 }}>
      <Button icon={<AndroidOutlined />} size='small' style={{ marginRight: 15, marginBottom: 15 }}>
        {' '}
        Android
      </Button>
      <Button icon={<AppleOutlined />} size='small' style={{ marginRight: 15, marginBottom: 15 }}>
        Apple
      </Button>
      <Button icon={<WindowsOutlined />} size='small' style={{ marginRight: 15, marginBottom: 15 }}>
        Windows
      </Button>
      <Button icon={<IeOutlined />} size='small' style={{ marginRight: 15, marginBottom: 15 }}>
        IE
      </Button>
    </Card>
  );
};

export default Tag;
