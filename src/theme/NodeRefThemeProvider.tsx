import { ColorSchemeScript, MantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import type { ReactNode } from 'react';

const colorSchemeManager = localStorageColorSchemeManager({ key: 'noderef-color-scheme' });

export function NodeRefThemeProvider({ children }: { children: ReactNode }) {
  const theme = {
    primaryColor: 'blue',
    luminanceThreshold: 0.15,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  };

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider
        defaultColorScheme="auto"
        colorSchemeManager={colorSchemeManager}
        theme={theme}
      >
        {children}
      </MantineProvider>
    </>
  );
}
