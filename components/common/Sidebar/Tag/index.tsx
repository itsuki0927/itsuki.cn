import { useContext } from 'react';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import AppContext from '@/utils/context';
import styles from './style.module.scss';

const cardBodyStyle = {
  paddingBottom: 12,
};

const buttonProps = {
  className: styles.btn,
};

const SidebarTag = () => {
  const context = useContext(AppContext);

  return (
    <Card title='Tag' className={styles.tag} bodyStyle={cardBodyStyle}>
      {context?.tags?.map(item => (
        <Tag key={item.id} buttonProps={buttonProps} tag={item} />
      ))}
    </Card>
  );
};

export default SidebarTag;
