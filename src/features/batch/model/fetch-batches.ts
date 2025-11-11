import { BatchDTO } from '@/entities/batch/model/types';
import { axiosInstance } from '@/shared/service/instance';

export const fetchBatches = async (
  statuseParams?: string,
  pageParam = 0,
): Promise<{
  batches: BatchDTO[];
  nextPage: number | undefined;
}> => {
  const take = 3;
  const skip = pageParam * take;

  const params = new URLSearchParams();
  params.set('take', take.toString());
  params.set('skip', skip.toString());

  const { data } = await axiosInstance.get(`/batch?${statuseParams ? statuseParams : ''}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_READ_KEY}`,
    },
  });

  if (!data) {
    throw new Error('Ошибка при загрузке партий');
  }

  const hasMore = data.length === take;
  return {
    batches: data,
    nextPage: hasMore ? pageParam + 1 : undefined,
  };
};
