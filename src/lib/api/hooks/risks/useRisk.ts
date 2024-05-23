import { type Risk} from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useRisks() {
  const queryInfo = useQuery<Risk[], Error>({
    queryKey: ['company-risk'],
    queryFn: async (): Promise<Risk[]> => {
      const { data } = await axios.get<Risk[]>('/api/risk/[id]');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
