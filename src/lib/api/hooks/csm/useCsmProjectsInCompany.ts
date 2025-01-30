import { type CsmProject } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useCsmProjectsInCompany() {
  const queryInfo = useQuery<CsmProject[], Error>({
    queryKey: ['company-csm-projects'],
    queryFn: async (): Promise<CsmProject[]> => {
      const { data } = await axios.get<CsmProject[]>('/api/csmProject');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
