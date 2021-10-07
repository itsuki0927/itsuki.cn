import classNames from 'classnames';
import Card from '../Card';
import styles from './style.module.scss';

const Empty = () => {
  return (
    <Card className={styles.empty} bodyStyle={{ padding: '12px 0' }}>
      <i className={classNames('iconfont', 'icon-empty', styles.icon)}></i>
      <p>暂无数据</p>
    </Card>
  );
};

export default Empty;
