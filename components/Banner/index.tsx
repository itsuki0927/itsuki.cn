import { useMemo } from 'react';
import Card from '../Card';
import Icon from '../Icon';
import styles from './style.module.scss';
import { getExpandsValue } from './util';

type BannerDataProps = {
  name: string;
  description: string;
  path: string;
  sort: number;
  expand?: string;
};
type BannerProps = {
  data?: BannerDataProps;
};

const Banner = ({ data }: BannerProps) => {
  const expands = useMemo(() => {
    if (data?.expand) {
      return JSON.parse(data.expand);
    }
    return null;
  }, [data?.expand]);

  if (!data) return <Card>loading...</Card>;

  const renderIcon = () => {
    const value = getExpandsValue(expands, 'icon');

    if (value === null) return null;

    return <Icon name={value} className={styles.logo}></Icon>;
  };

  const currentBackgroundImage = getExpandsValue(expands, 'background');

  return (
    <Card className={styles.banner}>
      <div
        style={{
          backgroundImage: `url(${currentBackgroundImage})`,
        }}
        className={styles.background}
      ></div>
      <div className={styles.content}>
        {renderIcon()}
        <p className={styles.description}>{data?.description}</p>
      </div>
    </Card>
  );
};

export default Banner;
