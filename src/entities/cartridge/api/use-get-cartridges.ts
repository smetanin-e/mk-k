import { axiosInstance } from '@/shared/service/instance';
import { useQuery } from '@tanstack/react-query';
import { CartridgeDTO } from '../model/types';

export const useGetCartridges = () => {
  return useQuery<CartridgeDTO[]>({
    queryKey: ['cartridges'],
    queryFn: async () => {
      return (
        await axiosInstance.get<CartridgeDTO[]>('/cartridge', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
          },
        })
      ).data;
    },
  });
};
