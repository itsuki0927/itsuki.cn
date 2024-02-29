import type { WithContext } from 'schema-dts';

interface JsonLdProps {
  content: WithContext<any>;
}

const JsonLd = ({ content }: JsonLdProps) => (
  <script
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }}
  />
);

export default JsonLd;
