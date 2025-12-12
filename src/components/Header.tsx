import { ActionIcon, Container, ContainerProps, Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReactNode } from 'react';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { SOCIAL_LINKS } from '@/constants/social-links';
import { useTranslation } from 'react-i18next';

type HeaderProps = ContainerProps & {
  logo?: ReactNode;
  mobileLogo?: ReactNode;
  mobileBreakpoint?: number;
};

export function Header({
  logo,
  mobileLogo,
  mobileBreakpoint = 500,
  style,
  ...containerProps
}: HeaderProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

  const defaultLogo = (
    <Text fw={700} fz={24}>
      {t('header.brand')}
    </Text>
  );

  const displayLogo = isMobile && mobileLogo ? mobileLogo : logo || defaultLogo;

  return (
    <Container component="header" py="md" {...containerProps} style={{ ...style }}>
      <Group justify="space-between" align="center">
        <div style={{ display: 'flex', alignItems: 'center' }}>{displayLogo}</div>
        <Group gap="xs" align="center" wrap="nowrap">
          {SOCIAL_LINKS.map(({ label, Icon }) => (
            <ActionIcon
              key={label}
              variant="default"
              radius="xl"
              size="lg"
              component="a"
              href={t(`social.${label}.url`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(`social.${label}.label`)}
            >
              <Icon size={18} />
            </ActionIcon>
          ))}
          <LanguageToggle />
          <ThemeToggle />
        </Group>
      </Group>
    </Container>
  );
}
