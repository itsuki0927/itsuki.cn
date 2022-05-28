import { marked } from 'marked';
import highlight from './highlight';
import purifyDomString from './purify';

marked.use({
  gfm: true,
  sanitize: false,
  breaks: true,
  pedantic: false,
  smartLists: false,
  smartypants: true,
  highlight(code, language) {
    return highlight.getLanguage(language)
      ? highlight.highlight(code, { language }).value
      : highlight.highlightAuto(code).value;
  },
});

const customRenderer = new marked.Renderer();

// 解析段落
customRenderer.paragraph = function renderText(text) {
  return `<p class='paragraph'>${text}</p>`;
};

// 解析标题
customRenderer.heading = function renderHeading(text, level, raw) {
  const id = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '-');
  return `<h${level} class='title' id=${id} alt=${id} title=${id}>${text}</h${level}>`;
};

// 解析链接
customRenderer.link = function renderLink(hrefProp: string, title: string, text: string) {
  const isSelf = hrefProp.includes('http://localhost:3000');
  let href = hrefProp;
  if (isSelf) {
    href = hrefProp.replace('http://localhost:3000', '');
  }
  const textIsImage = text.includes('<img');
  const textIsCode = text.includes('<code');

  return `<a
            href=${href}
            target='_blank'
            class="${textIsImage ? 'image-link' : 'link'}"
            title=${title || (textIsImage || textIsCode ? href : text)}
            ${isSelf ? '' : "rel='external noopener'"}
          >
            ${text}
          </a>`;
};

// 解析图片
customRenderer.image = function renderImage(src: string, title: string, text: string) {
  return `<img
            name=${`article-cover-${title || text}`}
            src=${src}
            title=${title || text}
            alt=${title || text}
          />`;
};

// 解析代码
customRenderer.code = function renderCode(
  code: string,
  language: string,
  escaped: boolean
) {
  if ((this as any).options.highlight) {
    const output = (this as any).options.highlight(code, language);
    if (output !== null) {
      // eslint-disable-next-line no-param-reassign
      code = output;
      // eslint-disable-next-line no-param-reassign
      escaped = true;
    }
  }

  /**
   * TODO:
   * <code>
   *   {code}
   * </code>
   * 为什么这么写会有一个换行
   */
  return language
    ? `<pre data-lang=${language}><code class='${
        (this as any).options.langPrefix
      }${escape(language)}'>${escaped ? code : escape(code)}</code></pre>`
    : `<pre><code>${escaped ? code : escape(code)}\n</code></pre>`;
};

// 解析文字
customRenderer.text = function renderText(text: string) {
  return text;
};

// 解析参数
type MarkedOptions = {
  purify?: boolean;
};

// markdown -> html
const markedToHtml = (markdown: string, { purify }: MarkedOptions = {}) => {
  if (!markdown || typeof markdown !== 'string') return '';

  const purifyMarkdown = purify ? purifyDomString(markdown) : markdown;

  return marked.parse(purifyMarkdown, {
    renderer: customRenderer,
  });
};

export default markedToHtml;
