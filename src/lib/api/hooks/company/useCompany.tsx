import type { Company } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useCompany() {
  const queryInfo = useQuery<Company, Error>({
    queryKey: ['my-company'],
    queryFn: async (): Promise<Company> => {
      const { data } = await axios.get<Company>('/api/company');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
