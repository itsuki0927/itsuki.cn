import { FC } from 'react';
import classNames from 'classnames';
import { StandardProps } from '@/types/common';

export type HeroProps = StandardProps;
export type HeroContainerProps = StandardProps;
export type HeroTitleProps = StandardProps;
export type HeroDescriptionProps = StandardProps;
export interface BackgroundImageProps extends StandardProps {
  url: string;
}

const BackgroundImage = ({ url, className, style }: BackgroundImageProps) => (
  <img
    src={url}
    className={classNames('max-h-[402px] w-full object-cover', className)}
    style={style}
    alt='hero'
  />
);

const Container = ({ children, className, style }: HeroContainerProps) => (
  <div
    className={classNames(
      'container absolute top-0 bottom-0 right-0 left-0 flex w-full flex-col justify-center sm:h-[402px]',
      className
    )}
    style={style}
  >
    {children}
  </div>
);

const Title = ({ children, className, style }: HeroTitleProps) => (
  <h1
    className={classNames(
      'mb-6 text-3xl font-medium tracking-tight text-gray-100 sm:text-5xl',
      className
    )}
    style={style}
  >
    {children}
  </h1>
);

const Description = ({ className, children, style }: HeroDescriptionProps) => (
  <p className={classNames('text-xl text-gray-200 sm:max-w-sm', className)} style={style}>
    {children}
  </p>
);

const Hero: FC<HeroProps> & {
  Container: typeof Container;
  Title: typeof Title;
  Description: typeof Description;
  BackgroundImage: typeof BackgroundImage;
} = ({ className, children }: HeroProps) => (
  <div
    className={classNames(
      'relative max-h-72 overflow-hidden bg-gray-50 sm:max-h-[402px]',
      className
    )}
  >
    {children}
  </div>
);

Hero.BackgroundImage = BackgroundImage;
Hero.Container = Container;
Hero.Title = Title;
Hero.Description = Description;

export default Hero;
