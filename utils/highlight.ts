import HLJSApi from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import less from 'highlight.js/lib/languages/less';
import lua from 'highlight.js/lib/languages/lua';
import markdown from 'highlight.js/lib/languages/markdown';
import graphql from 'highlight.js/lib/languages/graphql';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/atom-one-dark.css';

const languages = {
  css,
  json,
  bash,
  less,
  scss,
  markdown,
  javascript,
  typescript,
  lua,
  graphql,
} as const;

const aliasLanguage = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
};

Object.entries(languages).forEach(([name, language]) => {
  hljs.registerLanguage(name, language);
});

Object.entries(aliasLanguage).forEach(([alias, languageName]) =>
  hljs.registerAliases(alias, { languageName })
);

export default hljs as typeof HLJSApi;
