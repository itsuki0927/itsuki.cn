import { useQuery } from '@tanstack/react-query';
import { summaryKeys } from '@/constants/queryKeys';
import { getSiteSummary } from '@/api/summary';
import { getDaysDiffBetweenDates } from '@/utils/date';

const useSiteSummary = () => {
  const res = useQuery(summaryKeys.summary(), () => getSiteSummary(), {
    select: data => ({
      ...data,
      diffDay: Math.floor(getDaysDiffBetweenDates(new Date(data?.startTime), new Date())),
    }),
  });

  return res;
};

export default useSiteSummary;
