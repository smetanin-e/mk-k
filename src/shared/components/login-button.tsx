'use client';
import React from 'react';
import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';

interface Props {
  className?: string;
}

export const LoginButton: React.FC<Props> = () => {
  const { data: session } = useSession();
  return (
    <Button onClick={() => signIn('провайдер', { callbackUrl: '/', redirect: true })}>Логин</Button>
  );
};
