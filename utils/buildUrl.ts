import { BASE_URL } from '@/constants/app';

const buildUrl = (path: string) => {
  return new URL(path, BASE_URL);
};

export default buildUrl;
