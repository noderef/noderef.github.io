import { ActionIcon, Anchor, Container, Group, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '@/constants/social-links';
import { Logo } from './Logo';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <Container component="footer" py="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Anchor component={Link} to="/" aria-label="Go to home page">
            <Logo height={24} />
          </Anchor>
          <Group gap="xs">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <ActionIcon
                key={label}
                component="a"
                href={t(`social.${label}.url`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`social.${label}.label`)}
                variant="default"
                radius="xl"
              >
                <Icon size={18} />
              </ActionIcon>
            ))}
          </Group>
        </Group>
        <Text size="sm" c="dimmed">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </Text>
      </Stack>
    </Container>
  );
}
