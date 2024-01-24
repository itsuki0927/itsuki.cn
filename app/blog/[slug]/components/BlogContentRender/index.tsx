'use client';

import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Clock, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';
import prettifyNumber from '@/utils/prettifyNumber';
import { GetBlogResponse } from '@/libs/notion/getBlog';

interface NotionPageProps extends GetBlogResponse {
  blogViews: number;
}

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-coffeescript.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-objectivec.js'),
      import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-reason.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-stylus.js'),
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js'),
      import('./vscode.css'),
    ]);
    return m.Code;
  }),
);

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);

const BlogContentRender = ({ recordMap, blog, blogViews }: NotionPageProps) => {
  const components = useMemo(
    () => ({
      Collection,
      Code,
    }),
    [],
  );

  if (typeof window !== 'undefined') {
    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;
    const g = window as any;
    g.recordMap = recordMap;
    g.block = block;
  }

  return (
    <NotionRenderer
      disableHeader
      recordMap={recordMap}
      fullPage
      showTableOfContents={false}
      minTableOfContentsItems={1}
      components={components}
      pageHeader={
        <div className="mt-6 mb-2 sm:my-4">
          <motion.div
            className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.15,
              type: 'spring',
              stiffness: 150,
              damping: 20,
              delay: 0.255,
            }}
          >
            <span
              className="inline-flex items-center space-x-1.5"
              title={blogViews?.toString()}
            >
              <MousePointerClick className="animate-bounce" size={14} />
              <span>{prettifyNumber(blogViews ?? 0, true)} 次点击</span>
            </span>

            <span className="inline-flex items-center space-x-1.5">
              <Clock size={14} />
              <span>
                {blog?.publishedAt?.toLocaleString() ||
                  blog?.createdAt?.toLocaleString()}{' '}
                发布
              </span>
            </span>
          </motion.div>
        </div>
      }
    />
  );
};

export default BlogContentRender;
