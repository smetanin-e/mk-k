import { queryClient } from '@/shared/lib/query-client';
import { useMutation } from '@tanstack/react-query';
import { createUserAction } from '../../actions/create-user-action';
import toast from 'react-hot-toast';
import { toggleUserStatusAction } from '../../actions/toggle-user-status-action';
import { updateUserAction } from '../../actions/update-user-action';

export const useUserMutations = () => {
  const create = useMutation({
    mutationFn: createUserAction,

    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success('Пользователь добавлен! ✅');
      } else {
        toast.error(res.message || 'Ошибка при создании пользователя ❌');
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Не удалось добавить пользователя ❌');
    },
  });

  const toggleStatus = useMutation({
    mutationFn: toggleUserStatusAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success('Статус изменен! ✅');
      } else {
        toast.error(res.message || 'Ошибка при изменении статуса ❌');
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Не удалось изменить статус пользователя ❌',
      );
    },
  });

  const update = useMutation({
    mutationFn: updateUserAction,
    onSuccess: async (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success('Данные пользователя обновлены! ✅');
      } else {
        toast.error(res.message || 'Ошибка при обновлении данных ❌');
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Не удалось обновить данные пользователя ❌',
      );
    },
  });

  return {
    create,
    toggleStatus: {
      mutateAsync: toggleStatus.mutateAsync,
      isLoading: toggleStatus.isPending,
    },
    update: {
      mutateAsync: update.mutateAsync,
      isLoading: update.isPending,
    },
  };
};
