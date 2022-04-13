import { RefObject, useEffect, useState } from 'react';
import markedToHtml from '@/utils/marked';
import useIntersectionObserver from '../useIntersectionObserver';

const useMarkdown = (ref: RefObject<Element>, content: string) => {
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  const [contentHtml, setContentHtml] = useState(content);

  useEffect(() => {
    if (isVisible) {
      setContentHtml(markedToHtml(content));
    }
  }, [content, isVisible]);

  return contentHtml;
};

export default useMarkdown;
