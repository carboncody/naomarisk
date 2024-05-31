import { type Project } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useMyProjects() {
  const queryInfo = useQuery<Project[], Error>({
    queryKey: ['my-projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data } = await axios.get<Project[]>('/api/project/my');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
