import { useMutation } from '@tanstack/react-query';
import { registerCartridgeAction } from '../../actions/register-cartridge-action';
import { queryClient } from '@/shared/lib/query-client';
import toast from 'react-hot-toast';

export const useCartridgesMutations = () => {
  const create = useMutation({
    mutationFn: registerCartridgeAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['cartridges'] });
        toast.success('Картридж добавлен в реестр! ✅');
      } else {
        toast.error(res.message || 'Ошибка при регистрации картриджа ❌');
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Не удалось зарегистрировать картридж ❌',
      );
    },
  });

  return {
    create,
  };
};
