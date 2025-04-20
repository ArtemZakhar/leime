'use client';

import ReactQueryProvider from '@/utilities/ReactQueryProvider';
import { HeroUIProvider } from '@heroui/system';

import * as React from 'react';

import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

import { MemsProvider } from '@/context/MemsContext';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <ReactQueryProvider>
          <MemsProvider>{children}</MemsProvider>
        </ReactQueryProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
