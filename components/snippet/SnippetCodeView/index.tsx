import { useState } from 'react';
import classNames from 'classnames';
import { Breadcrumbs, NavbarLayout } from '@/components/common';
import { CheckOutlined, CopyOutlined } from '@/components/icons';
import { IconButton, Card, MarkdownBlock, Tag } from '@/components/ui';
import { rs } from '@/constants/ranks';
import { SnippetDetail } from '@/entities/snippet';
import { copyTextToClipboard } from '@/utils/index';
import styles from './style.module.scss';

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

interface SnippetCodeViewProps {
  snippet: SnippetDetail;
  breadcrumbs: { url: string; name: string }[];
}
const SnippetCodeView = ({ snippet, breadcrumbs }: SnippetCodeViewProps) => {
  const [copy, setCopy] = useState(false);
  const copyState = copyStates[`${copy}`];
  const status = rs(snippet.ranks);

  const handleCopy = () => {
    setCopy(true);
    copyTextToClipboard(snippet.code);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <>
      <Card bodyStyle={{ padding: '12px 24px' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Card>
      <Card
        className={classNames('container', styles.snippetCode)}
        title={
          <div className={styles.header}>
            <h1 className={styles.name}>{snippet.name}</h1>
            <Tag color={status.color} size='sm' className={styles.tag}>
              {status.name}
            </Tag>
          </div>
        }
        extra={
          <IconButton
            type='primary'
            disabled={copyState.disabled}
            icon={copyState.icon}
            onClick={handleCopy}
          >
            {copyState.text}
          </IconButton>
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
