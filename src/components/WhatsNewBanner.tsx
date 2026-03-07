import { Container, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconRobot } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export function WhatsNewBanner() {
  const { t } = useTranslation();

  return (
    <Container mb="lg">
      <Paper withBorder radius="md" p="md">
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Group align="center" gap="md" wrap="nowrap" style={{ minWidth: 0 }}>
            <ThemeIcon variant="light" color="blue" size={42} radius="md">
              <IconRobot size={20} stroke={1.8} />
            </ThemeIcon>

            <Stack gap={2} style={{ minWidth: 0 }}>
              <Text size="xs" tt="uppercase" fw={700} c="blue">
                {t('whatsNew.badge')}
              </Text>
              <Text fw={700} size="lg" lh={1.2}>
                {t('whatsNew.title')}
              </Text>
              <Text c="dimmed" size="sm" lh={1.4}>
                {t('whatsNew.description')}
              </Text>
            </Stack>
          </Group>

        </Group>
      </Paper>
    </Container>
  );
}
