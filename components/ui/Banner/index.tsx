import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import { getExpandValue } from '@/utils/expands';
import styles from './style.module.scss';

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
  if (!data) return <Card>loading...</Card>;

  const renderIcon = () => {
    const value = getExpandValue(data.expand!, 'icon');

    if (value === null) return null;

    return <Icon name={value} className={styles.logo} />;
  };

  const currentBackgroundImage = getExpandValue(data.expand!, 'backgroundImage');

  return (
    <div className={styles.banner}>
      <div
        style={{
          backgroundImage: `url(${currentBackgroundImage})`,
        }}
        className={styles.background}
      />
      <div className={styles.content}>
        {renderIcon()}
        <p className={styles.description}>{data?.description}</p>
      </div>
    </div>
  );
};

export default Banner;
