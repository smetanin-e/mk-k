import { useMutation } from '@tanstack/react-query';
import { createBatchAction } from '../../actions/create-batch-action';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';

export const useBatchMutations = () => {
  const create = useMutation({
    mutationFn: createBatchAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['batches'] }),
          queryClient.invalidateQueries({ queryKey: ['cartridges'] }),
        ]);

        toast.success('Партия оформлена! ✅');
      } else {
        toast.error(res.message || 'Ошибка при оформлении партии ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось оформить партию ❌');
    },
  });

  return {
    create,
  };
};
