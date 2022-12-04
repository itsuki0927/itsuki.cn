'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import Sandbox from '@/components/common/Sandbox';
import {
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  H4,
  Image,
  InlineCode,
  LegacyImage,
  Link,
  OrderedList,
  Table,
  Text,
  UnOrderedList,
} from './MdxComponents';

interface MdxContentProps {
  source: MDXRemoteProps;
}

export const customMdxComponents = {
  Image,
  Sandbox,
};

export const markdownComponents = {
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
  img: LegacyImage,
  table: Table,
};

const MdxContent = ({ source }: MdxContentProps) => {
  return (
    <MDXRemote
      {...source}
      components={{
        ...markdownComponents,
        ...customMdxComponents,
        ...source.components,
      }}
    />
  );
};

export default MdxContent;
