'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { changePasswordSchema, ChangePasswordType } from '../model/schemas/change-password-schema';
import { FormInput } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { changeUserPasswordAction } from '../actions/change-user-password';

interface Props {
  className?: string;
  id: number;
  setOpen: (value: boolean) => void;
}

export const ChangePasswordForm: React.FC<Props> = ({ id, setOpen }) => {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordType) => {
    try {
      await changeUserPasswordAction(id, data);
      setOpen(false);
      toast.success('Пароль успешно изменен✅');
    } catch (error) {
      console.log('Error [LOGIN_FORM]', error);
      return toast.error(error instanceof Error ? error.message : 'Ошибка ❌');
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label='Текущий пароль'
          name='currentPassword'
          id='currentPassword'
          type='password'
          placeholder='Текущий пароль...'
          required
        />

        <FormInput
          label='Новый пароль'
          name='password'
          id='password'
          type='password'
          placeholder='Новый пароль...'
          required
        />
        <FormInput
          label='Подтверждение пароля'
          name='confirmPassword'
          id='confirmPassword'
          type='password'
          placeholder='Подтверждение пароля...'
          required
        />

        <Button disabled={form.formState.isSubmitting} className='w-full' type='submit'>
          Изменить пароль
        </Button>
      </form>
    </FormProvider>
  );
};
