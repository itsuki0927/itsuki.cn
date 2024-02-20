import React from "react";
import { getBlogHeadingElementId } from "@/constants/anchor";
import type { StandardProps } from "@/types/common";
import Code from "./Code";
// import LegacyImage from "./LegacyImage";
// import Image from "./Image";
import styles from "./style.module.scss";

export const H1 = ({ children, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h1
      className="relative group mt-0 mb-10 text-4xl font-semibold"
      id={id}
      {...rest}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h2
      className="relative group mt-24 mb-8 text-3xl font-semibold"
      id={id}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ children, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h3
      className="relative group mt-11 mb-6 text-2xl font-semibold"
      id={id}
      {...rest}
    >
      {children}
    </h3>
  );
};

export const H4 = ({ children, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h4
      className="relative group mt-8 mb-6 text-xl font-semibold"
      id={id}
      {...rest}
    >
      {children}
    </h4>
  );
};

export const OrderedList = ({ children, ...rest }: StandardProps) => {
  return (
    <ol className={styles.olWrapper} {...rest}>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any, index) =>
          child.props ? (
            // eslint-disable-next-line react/no-array-index-key
            <li className={`${styles.olItem} group`} key={index}>
              {child.props.children}
            </li>
          ) : null,
        )}
    </ol>
  );
};

export const UnOrderedList = ({ children, ...rest }: StandardProps) => {
  return (
    <ul className={styles.ulWrapper} {...rest}>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any, index) =>
          child.props ? (
            <li className={`${styles.ulItem} group`} key={index}>
              {child.props.children}
            </li>
          ) : null,
        )}
    </ul>
  );
};

export const Text = ({ children }: StandardProps) => {
  return <p className="mb-1 leading-8 group relative">{children}</p>;
};

export const InlineCode = ({ children, ...rest }: StandardProps) => {
  return (
    <code className="mx-1 rounded-sm bg-gray-200 p-1 text-sm" {...rest}>
      {children}
    </code>
  );
};

export const Blockquote = ({ children, ...rest }: StandardProps) => {
  return (
    <blockquote className={`${styles.blockquote} group`} {...rest}>
      {children}
    </blockquote>
  );
};

interface LinkProps extends StandardProps {
  href?: string;
}

export const Link = ({ href, children, ...rest }: LinkProps) => {
  return (
    <a className={styles.externalLink} href={href} {...rest}>
      {children}
    </a>
  );
};

export const Table = ({ children, ...rest }: StandardProps) => {
  return (
    <table className={styles.table} {...rest}>
      {children}
    </table>
  );
};

const markdownComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  ol: OrderedList,
  ul: UnOrderedList,
  p: Text,
  pre: Code,
  a: Link,
  code: InlineCode,
  blockquote: Blockquote,
  // img: LegacyImage,
  table: Table,
};

export default markdownComponents;
