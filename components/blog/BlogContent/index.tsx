'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import {
  Blockquote,
  Code,
  H2,
  H3,
  H4,
  Image,
  InlineCode,
  Link,
  OrderedList,
  Text,
} from '@/components/ui/Mdx';

interface BlogContentProps {
  source: MDXRemoteProps;
}

const customMdxComponents = {
  Image,
};

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  ol: OrderedList,
  ul: OrderedList,
  p: Text,
  pre: Code,
  a: Link,
  code: InlineCode,
  blockquote: Blockquote,

  ...customMdxComponents,
};

const BlogContent = ({ source }: BlogContentProps) => {
  return <MDXRemote {...source} components={components} />;
};

export default BlogContent;
