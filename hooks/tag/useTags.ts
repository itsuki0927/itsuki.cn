import { useQuery } from '@tanstack/react-query';
import { tagKeys } from '@/constants/queryKeys';
import { getAllTags } from '@/api/tag';

const useTags = () => useQuery(tagKeys.lists(), () => getAllTags());

export default useTags;
