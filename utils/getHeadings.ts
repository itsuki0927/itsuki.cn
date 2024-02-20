import { getBlogHeadingElementId } from '@/constants/anchor';

export interface BlogHeading {
  text: string;
  id: string;
}

const getHeadings = (content: string): BlogHeading[] => {
  return content
    .split('\n')
    .filter((line) => /^##\s/.exec(line))
    .map((line) => line.replace('##', '').trim())
    .map((text) => ({
      text,
      id: getBlogHeadingElementId(text),
    }));
};

export default getHeadings;
