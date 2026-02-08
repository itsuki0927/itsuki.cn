/**
 * Wraps each section of the page in a PageSection component. A section is
 * delimited by "---".
 */
const splitPage = (content: string) => {
  const sections = content.split('====');
  const parts = sections.flatMap((section, index) => {
    if (index === sections.length - 1) return [section];
    return [
      section,
      `</PageSection>\n\n<PageSection index={${index + 1}}>`,
    ];
  });
  parts.unshift('<PageSection index={0}>\n\n');
  parts.push('\n</PageSection>');

  return {
    content: parts.join(''),
    length: sections.length,
  };
};

export default splitPage;
