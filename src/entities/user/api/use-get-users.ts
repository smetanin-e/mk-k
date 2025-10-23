import { axiosInstance } from '@/shared/service/instance';
import { useQuery } from '@tanstack/react-query';
import { Agent } from '../model/types';

export const useGetUsers = () => {
  return useQuery<Agent[]>({
    queryKey: ['users'],
    queryFn: async () => {
      return (
        await axiosInstance.get<Agent[]>('/user', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
          },
        })
      ).data;
    },
  });
};
