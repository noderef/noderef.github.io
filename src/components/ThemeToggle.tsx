import { ActionIcon, rem, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? 'var(--mantine-color-yellow-3)' : 'var(--mantine-color-blue-9)';

  return (
    <Tooltip label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <ActionIcon
        variant="default"
        radius="xl"
        size="lg"
        onClick={() => toggleColorScheme()}
        aria-label="Toggle color scheme"
      >
        {isDark ? (
          <IconSun style={{ width: rem(20), height: rem(20), color: iconColor }} />
        ) : (
          <IconMoon style={{ width: rem(20), height: rem(20), color: iconColor }} />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
