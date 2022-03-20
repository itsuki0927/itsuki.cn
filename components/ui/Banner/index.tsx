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
      <Icon name={value} className='text-[95px] group-hover:scale-90 transition-all' />
    );
  };

  const currentBackgroundImage = getExpandValue(data.expand!, 'backgroundImage');

  return (
    <div
      className={`h-60 overflow-hidden relative border-white border-solid border-[16px] group ${className}`}
    >
      <div
        style={{
          backgroundImage: `url(${currentBackgroundImage})`,
        }}
        className='absolute left-0 top-0 right-0 bottom-0 bg-cover bg-center opacity-70 z-0 transition-all group-hover:scale-110'
      />
      <div className='absolute z-10 w-full h-full flex flex-col items-center justify-center bg-mask text-gray-50 opacity-70 transition-opacity group-hover:opacity-100'>
        {renderIcon()}
        <p className='mt-6 text-xl'>{data?.description}</p>
      </div>
    </div>
  );
};

export default Banner;
