import { useQuery } from 'react-query';
import { tagKeys } from '@/constants/queryKeys';
import { getAllTags } from '@/api/tag';

const useTags = () => {
  const res = useQuery(tagKeys.lists(), () => getAllTags());

  return {
    ...res,
  };
};

export default useTags;
