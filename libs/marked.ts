import escape from 'lodash.escape';
import { marked } from 'marked';
import { WEB_URL } from '@/configs/app';
import highlight from './highlight';
import purifyDomString from './purify';
import { getCommentElementId } from '@/constants/anchor';

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

interface RendererGetterOption {
  purify: boolean;
  text: (text: string) => string;
  headingID: (html: string, level: number, raw: string) => string;
}

const getRenderer = (options?: Partial<RendererGetterOption>) => {
  const renderer = new marked.Renderer();

  renderer.html = html => (options?.purify ? purifyDomString(html) : html);

  // 解析段落
  renderer.paragraph = function renderText(text) {
    return `<p class='paragraph'>${text}</p>`;
  };

  // 解析标题
  renderer.heading = (html, level, raw) => {
    const idText = options?.headingID
      ? `id="${options.headingID(html, level, raw)}"`
      : '';
    const safeRaw = escape(raw);
    return `<h${level} ${idText} alt="${safeRaw}" title="${safeRaw}">${html}</h${level}>`;
  };

  // 解析链接
  renderer.link = function renderLink(hrefProp: string, title: string, text: string) {
    const isSelf = hrefProp.startsWith(WEB_URL);
    let href = hrefProp;
    if (isSelf) {
      href = hrefProp.replace(WEB_URL, '');
    }
    const textIsImage = text.includes('<img');
    const textIsCode = text.includes('<code');

    return `<a
              href=${href}
              target='_blank'
              title=${title || (textIsImage || textIsCode ? href : text)}
              ${isSelf ? '' : "rel='external noopener'"}
            >
              ${text}
            </a>`;
  };

  // 解析图片
  renderer.image = function renderImage(src: string, title: string, text: string) {
    return `<img
              name=${`article-cover-${title || text}`}
              src=${src}
              title=${title || text}
              alt=${title || text}
            />`;
  };

  // 解析代码
  renderer.code = function renderCode(code: string, language: string, escaped: boolean) {
    if (renderer.options.highlight) {
      const output = renderer.options.highlight(code, language) || '';
      if (output) {
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
      ? `<pre data-lang=${language}><code class='${renderer.options.langPrefix}${escape(
          language
        )}'>${escaped ? code : escape(code)}</code></pre>`
      : `<pre><code>${escaped ? code : escape(code)}\n</code></pre>`;
  };

  // 解析文字
  renderer.text = function renderText(text: string) {
    // 如果是评论@回复
    if (text.startsWith('@') && text.includes('-')) {
      const parentName = text.slice(1);
      const index = parentName.indexOf('-');
      const name = parentName.slice(0, index);
      const id = parentName.slice(index + 1);
      return `<a href='#comment-${id}' class='reply-comment' id=${getCommentElementId(
        id
      )}>@${name}</a>`;
    }
    return text;
  };

  return renderer;
};

// 解析参数
type MarkedOptions = {
  purify?: boolean;
  headingIDRenderer?: RendererGetterOption['headingID'];
};

export const markedToHtml = (markdown: string, options?: MarkedOptions) => {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  const renderOptions: Partial<RendererGetterOption> = {
    headingID: options?.headingIDRenderer,
  };

  // sanitize
  if (options?.purify) {
    renderOptions.purify = true;
  }

  return marked.parse(markdown, { renderer: getRenderer(renderOptions) });
};

export default markedToHtml;
