import { type User } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function User() {
  const queryInfo = useQuery<User[], Error>({
    queryKey: ['company-user'],
    queryFn: async (): Promise<User[]> => {
      const { data } = await axios.get<User[]>('/api/user/getall');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
