import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import markdownComponents from '../markdown';
import PageSection from '../../app/blog/[slug]/components/PageSection';

export const customMdxComponents = {
  // Image,
  PageSection,
  /* Sandbox, */
};

const baseMdxComponents = {
  ...markdownComponents,
  ...customMdxComponents,
};

const MdxContent = ({ components, ...rest }: MDXRemoteProps) => {
  const mergedComponents = components
    ? {
        ...baseMdxComponents,
        ...components,
      }
    : baseMdxComponents;

  return (
    <MDXRemote {...rest} components={mergedComponents} />
  );
};

export default MdxContent;
