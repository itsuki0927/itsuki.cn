import BlogTableOfContentUI from './ui';
import { BlogHeading } from '@/utils/getHeadings';
import React from 'react';

interface BlogTableOfContentProps {
  headings: BlogHeading[];
}

const BlogTableOfContent = ({ headings }: BlogTableOfContentProps) => {
  return <BlogTableOfContentUI headings={headings} />;
};

export default BlogTableOfContent;
