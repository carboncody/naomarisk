import { type User } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useEmployee({ email }: { email: string }) {
  const queryInfo = useQuery<User, Error>({
    queryKey: ['employee-' + email],
    queryFn: async (): Promise<User> => {
      const { data } = await axios.get<User>(`/api/user/${email}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
