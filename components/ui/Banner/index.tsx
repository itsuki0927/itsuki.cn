import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import { getExpandValue } from '@/utils/expands';

type BannerDataProps = {
  name: string;
  description: string;
  path: string;
  sort: number;
  expand?: string;
};

type BannerProps = {
  data?: BannerDataProps;
  className?: string;
};

const Banner = ({ data, className }: BannerProps) => {
  if (!data) return <Card>loading...</Card>;

  const renderIcon = () => {
    const value = getExpandValue(data.expand!, 'icon');

    if (value === null) return null;

    return (
      <Icon name={value} className='text-[95px] transition-all group-hover:scale-90' />
    );
  };

  const currentBackgroundImage = getExpandValue(data.expand!, 'backgroundImage');

  return (
    <div
      className={`group relative h-60 overflow-hidden border-[16px] border-solid border-white ${className}`}
    >
      <div
        style={{
          backgroundImage: `url(${currentBackgroundImage})`,
        }}
        className='absolute left-0 top-0 right-0 bottom-0 z-0 bg-cover bg-center opacity-70 transition-all group-hover:scale-110'
      />
      <div className='absolute z-10 flex h-full w-full flex-col items-center justify-center bg-mask text-gray-50 opacity-70 transition-opacity group-hover:opacity-100'>
        {renderIcon()}
        <p className='mt-6 text-xl'>{data?.description}</p>
      </div>
    </div>
  );
};

export default Banner;
