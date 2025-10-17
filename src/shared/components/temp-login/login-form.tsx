'use client';
import React from 'react';

import { Button } from '@/shared/components//ui';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, loginSchema } from './login-schema';
import { FormInput } from '../form/form-input';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
  className?: string;
}

export const LoginForm: React.FC<Props> = () => {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw new Error();
      }
      //закрыть модалку
      toast.success('Добро пожаловать!');
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт');
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <FormInput
            label='Логин'
            name='login'
            id='login'
            type='text'
            placeholder='Логин...'
            required
          />
        </div>
        <div className='space-y-2'>
          <FormInput
            label='Пароль'
            name='password'
            id='password'
            type='password'
            placeholder='Введите пароль'
            required
          />
        </div>

        <Button disabled={form.formState.isSubmitting} className='w-full' type='submit'>
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
