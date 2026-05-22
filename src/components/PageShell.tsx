import { AppShell } from '@mantine/core';
import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Logo } from './Logo';
import { MOBILE_HEADER_BREAKPOINT_PX } from '@/constants/layout';

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Header
          mt="xl"
          mb="calc(var(--mantine-spacing-xl) * 1.5)"
          logo={<Logo />}
          mobileLogo={<Logo variant="mark" />}
          mobileBreakpoint={MOBILE_HEADER_BREAKPOINT_PX}
        />
        {children}
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
