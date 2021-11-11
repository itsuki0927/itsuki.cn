import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { Breadcrumbs, NavbarLayout } from '@/components/common';
import { CheckOutlined, CopyOutlined } from '@/components/icons';
import { Button, Card, MarkdownBlock } from '@/components/ui';
import blog from '@/lib/api/blog';
import { copyTextToClipboard } from '@/utils/index';
import markedToHtml, { genMarkdownString } from '@/utils/marked';

export const getStaticPaths = async () => {
  const { snippets } = await blog.getAllSnippetPaths();

  const paths = snippets.map(snippet => `/snippet/${snippet.id}`);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const snippetId = Number(params?.id);

  const { snippet } = await blog.getSnippet({ variables: { snippetId } });

  const siteInfo = await blog.getSiteInfo();

  snippet.skillHtml = markedToHtml(snippet.skill);
  snippet.codeHtml = markedToHtml(genMarkdownString(snippet.code, 'js'));
  snippet.exampleHtml = markedToHtml(genMarkdownString(snippet.example, 'js'));

  const breadcrumbs = [
    { url: '/snippet', name: 'snippet' },
    {
      url: `/snippet/${snippetId}`,
      name: snippet.name,
    },
  ];

  return {
    props: {
      snippet,
      breadcrumbs,
      ...siteInfo,
    },
    revalidate: 10,
  };
};

const copyStates = {
  true: {
    disabled: true,
    icon: <CheckOutlined />,
    text: '复制成功',
  },
  false: {
    disabled: false,
    icon: <CopyOutlined />,
    text: '复制代码',
  },
};

const SnippetCodeView = ({
  snippet,
  breadcrumbs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [copy, setCopy] = useState(false);
  const copyState = copyStates[`${copy}`];

  const handleCopy = () => {
    setCopy(true);
    copyTextToClipboard(snippet.code);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <>
      <Card style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 24px' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Card>
      <Card
        className='container'
        title={<h1 style={{ margin: '6px 0' }}>{snippet.name}</h1>}
        extra={
          <Button
            type='primary'
            disabled={copyState.disabled}
            icon={copyState.icon}
            onClick={handleCopy}
          >
            {copyState.text}
          </Button>
        }
      >
        <p>{snippet.description}</p>

        <MarkdownBlock htmlContent={snippet.skillHtml} />

        <h3>Code</h3>
        <MarkdownBlock htmlContent={snippet.codeHtml} />

        <h3>Example</h3>
        <MarkdownBlock htmlContent={snippet.exampleHtml} />
      </Card>
    </>
  );
};

SnippetCodeView.Layout = NavbarLayout;

export default SnippetCodeView;
