import { ReactNode, CSSProperties, ElementType } from 'react';

export interface StandardProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export interface WithAsProps<As extends ElementType | string = ElementType>
  extends StandardProps {
  as?: As;
}

export interface PageProps<T> {
  params: T;
}
