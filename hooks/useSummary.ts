import { useQuery } from 'react-query';
import { summaryKeys } from '@/constants/queryKeys';
import { getSiteSummary } from '@/api/summary';

const useSiteSummary = () => {
  const res = useQuery(summaryKeys.summary(), () => getSiteSummary(), {
    onSuccess: data => ({
      ...data,
      startTime: new Date(data.startTime),
    }),
  });

  return res;
};

export default useSiteSummary;
