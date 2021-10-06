import { Category } from '@/entities/category';
import classNames from 'classnames';
import { useMemo } from 'react';
import Card from '../../Card';
import styles from './style.module.scss';

type BannerProps = {
  category?: Category;
};

export const getExpandsValue = (expands: any, key: string) => {
  if (!expands || !expands.length) {
    return null;
  }
  const targetExtend = expands.find((t: any) => t.name === key);
  return targetExtend ? targetExtend.value : null;
};

const Banner = ({ category }: BannerProps) => {
  console.log(category);

  const expands = useMemo(() => {
    if (category?.expand) {
      return JSON.parse(category.expand);
    }
    return null;
  }, [category?.expand]);

  if (!category) return <Card>loading...</Card>;

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
        <p className={styles.description}>{category?.description}</p>
      </div>
    </Card>
  );
};

export default Banner;
