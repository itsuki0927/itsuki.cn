import classNames from 'classnames';
import { useMemo } from 'react';
import Card from '../Card';
import styles from './style.module.scss';
import { getExpandsValue } from './util';

type BannerDataProps = {
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  parentId: number;
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

    return <i className={classNames('iconfont', `icon-${value}`, styles.logo)}></i>;
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
