import { useQuery } from 'react-query';
import { summaryKeys } from '@/constants/queryKeys';
import { getSiteSummary } from '@/api/summary';

const getDaysDiffBetweenDates = (dateInitial: Date, dateFinal: Date) =>
  (dateFinal.getTime() - dateInitial.getTime()) / (1000 * 3600 * 24);

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
