import { axiosInstance } from '@/shared/service/instance';
import { Departament } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useGetDepartaments = () => {
  return useQuery<Departament[]>({
    queryKey: ['departaments'],
    queryFn: async () => {
      return (
        await axiosInstance.get<Departament[]>('/departament', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
          },
        })
      ).data;
    },
    initialData: [],
  });
};
