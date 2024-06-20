import { type Risk } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useRisk(riskId: string) {
  const queryInfo = useQuery<Risk, Error>({
    queryKey: ['risk-' + riskId],
    queryFn: async (): Promise<Risk> => {
      const { data } = await axios.get<Risk>('/api/risk/' + riskId);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
