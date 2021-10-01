import Button from '@/components/Button';
import Card from '@/components/Card';
import { Tag } from '@/entities/tag';
import { AndroidOutlined } from '@ant-design/icons';
import { getTags } from 'api/global';
import { useEffect, useState } from 'react';

const SidebarTag = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(res => {
      setTags(res.data);
    });
  }, []);

  return (
    <Card title='Tag' style={{ width: 320 }}>
      {tags.map(item => (
        <Button
          key={item.id}
          icon={<AndroidOutlined />}
          size='small'
          style={{ marginRight: 15, marginBottom: 15 }}
        >
          {item.name}
        </Button>
      ))}
    </Card>
  );
};

export default SidebarTag;
