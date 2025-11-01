import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';
import { createReplaceAction } from '../../actions/create-replace-action';

export const useReplacementMutations = () => {
  const create = useMutation({
    mutationFn: createReplaceAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['replacements'] }),
          queryClient.invalidateQueries({ queryKey: ['cartridges'] }),
        ]);
        toast.success('Замена оформлена! ✅');
      } else {
        toast.error(res.message || 'Ошибка при оформлении замены ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось оформить замену ❌');
    },
  });

  return {
    create,
  };
};
