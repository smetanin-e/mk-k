'use client';
import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { Theme } from './theme';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const color = 'var(--color-primary)';
  return (
    <>
      {' '}
      <ThemeProvider attribute={'class'} enableSystem defaultTheme='system'>
        <SessionProvider>
          {children}
          <Theme />
          <Toaster />
          <NextTopLoader color={color} shadow={`0 0 10px ${color},0 0 5px ${color}`} />
        </SessionProvider>{' '}
      </ThemeProvider>
    </>
  );
};
