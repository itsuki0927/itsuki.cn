import DOMPurify from 'dompurify';

/**
 * 过滤dom string
 *
 * @param domString dom string
 * @returns 过滤后的dom string
 */
const purifyDomString = (domString: string) => {
  if (DOMPurify.isSupported && domString) {
    return DOMPurify.sanitize(domString);
  }
  return domString;
};

export default purifyDomString;
