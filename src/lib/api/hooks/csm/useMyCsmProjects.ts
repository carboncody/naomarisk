import { type CsmProject } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useMyCsmProjects() {
  const queryInfo = useQuery<CsmProject[], Error>({
    queryKey: ['my-csm-projects'],
    queryFn: async (): Promise<CsmProject[]> => {
      const { data } = await axios.get<CsmProject[]>('/api/csmProject/my');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
