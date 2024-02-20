import { CSSProperties, ReactNode } from "react";

export interface StandardProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export interface PageProps<T> {
  params: T;
}
