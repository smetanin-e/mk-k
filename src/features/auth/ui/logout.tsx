'use client';
import React from 'react';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
}
export const Logout: React.FC<Props> = () => {
  const logout = async () => {
    await signOut({ callbackUrl: '/' });

    toast('Выход из аккаунта');
  };
  return (
    <p className='mb-4 px-4 cursor-pointer hover:text-shadow-lg' onClick={logout}>
      Выход
    </p>
  );
};
