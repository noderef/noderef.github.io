import { ActionIcon, Container, ContainerProps, Group, Text, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconNews } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { MOBILE_HEADER_BREAKPOINT_PX } from '@/constants/layout';
import { SOCIAL_LINKS } from '@/constants/social-links';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type HeaderProps = ContainerProps & {
  logo?: ReactNode;
  mobileLogo?: ReactNode;
  mobileBreakpoint?: number;
};

export function Header({
  logo,
  mobileLogo,
  mobileBreakpoint = MOBILE_HEADER_BREAKPOINT_PX,
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
        <Link
          to="/"
          aria-label="Go to home page"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          {displayLogo}
        </Link>
        <Group gap="xs" align="center" wrap="nowrap">
          <Tooltip label={t('header.blogTooltip')}>
            <ActionIcon
              component={Link}
              to="/blog"
              variant="default"
              radius="xl"
              size="lg"
              aria-label={t('header.blogTooltip')}
            >
              <IconNews size={18} />
            </ActionIcon>
          </Tooltip>
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
