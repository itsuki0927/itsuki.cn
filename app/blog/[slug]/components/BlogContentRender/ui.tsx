'use client';

import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { ReactNode, useMemo } from 'react';
import { GetBlogResponse } from '@/libs/notion/getBlog';
import canUseDOM from '@/utils/canUseDOM';

interface NotionPageProps extends GetBlogResponse {
  pageHeader: ReactNode;
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

const BlogContentRenderUI = ({ recordMap, pageHeader }: NotionPageProps) => {
  const components = useMemo(
    () => ({
      Collection,
      Code,
    }),
    [],
  );

  if (canUseDOM) {
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
      pageHeader={<div className="mt-6 mb-2 sm:my-4">{pageHeader}</div>}
    />
  );
};

export default BlogContentRenderUI;
