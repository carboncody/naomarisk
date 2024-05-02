import { type Project } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useProjectsInCompany() {
  const queryInfo = useQuery<Project[], Error>({
    queryKey: ['company-projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data } = await axios.get<Project[]>('/api/project/getall');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
