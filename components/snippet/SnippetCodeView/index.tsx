import classNames from 'classnames';
import { BreadcrumbJsonLd } from 'next-seo';
import { useState } from 'react';
import { Breadcrumbs, NavbarLayout } from '@/components/common';
import { CheckOutlined, CopyOutlined } from '@/components/icons';
import { Card, IconButton, MarkdownBlock, Tag } from '@/components/ui';
import { WEB_URL } from '@/configs/app';
import { rs } from '@/constants/ranks';
import { SnippetDetail } from '@/entities/snippet';
import { useTimeout } from '@/hooks';
import copyTextToClipboard from '@/utils/copy';
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

  const { reset, clear } = useTimeout(
    () => {
      setCopy(false);
      clear();
    },
    3000,
    true
  );

  const handleCopy = () => {
    copyTextToClipboard(snippet.code).then(() => {
      setCopy(true);
      reset();
    });
  };

  return (
    <>
      <Card>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <BreadcrumbJsonLd
          itemListElements={breadcrumbs.map((breadcrumb, index) => ({
            position: index + 1,
            name: breadcrumb.name,
            item: `${WEB_URL}${breadcrumb.url}`,
          }))}
        />
      </Card>
      <div className={classNames('container', styles.snippetCode)}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.name}>{snippet.name}</h2>
            <Tag color={status.color} size='sm' className={styles.tag}>
              {status.name}
            </Tag>
          </div>
          <IconButton
            disabled={copyState.disabled}
            icon={copyState.icon}
            onClick={handleCopy}
          >
            {copyState.text}
          </IconButton>
        </div>

        <p>{snippet.description}</p>

        <MarkdownBlock htmlContent={snippet.skillHtml} />

        <h3>Code</h3>
        <MarkdownBlock htmlContent={snippet.codeHtml} />

        <h3>Example</h3>
        <MarkdownBlock htmlContent={snippet.exampleHtml} />
      </div>
    </>
  );
};

SnippetCodeView.Layout = NavbarLayout;

export default SnippetCodeView;
