import { Card, Code, Container, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import {
  IconActivity,
  IconSearch,
  IconBookmark,
  IconServer,
  IconTerminal,
  IconFolders,
  IconFileText,
  IconSitemap,
  IconSettings,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

type TablerIcon = typeof IconActivity;

type Feature = {
  key: string;
  icon: TablerIcon;
};

const FEATURES: Feature[] = [
  { key: 'dashboardActivity', icon: IconActivity },
  { key: 'queryBuilder', icon: IconSearch },
  { key: 'savedSearches', icon: IconBookmark },
  { key: 'multiServer', icon: IconServer },
  { key: 'jsConsole', icon: IconTerminal },
  { key: 'nodeBrowserTabs', icon: IconFolders },
  { key: 'fileViewerEditor', icon: IconFileText },
  { key: 'systemTree', icon: IconSitemap },
  { key: 'personalization', icon: IconSettings },
];

export function Features() {
  const { t } = useTranslation();

  return (
    <Container component="section" py="xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Stack align="center" gap="xs">
          <Title order={2} ta="center" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            {t('features.title')}
          </Title>
          <Text
            c="dimmed"
            ta="center"
            maw={640}
            fz="lg"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
          >
            {t('features.description')}
          </Text>
        </Stack>
      </motion.div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mt="lg">
        {FEATURES.map(({ key, icon: Icon }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card withBorder padding="lg" radius="md" style={{ height: '100%' }}>
              <Stack gap="xs">
                <ThemeIcon variant="light" color="blue" size={40} radius="md">
                  <Icon size={20} />
                </ThemeIcon>
                <Text fw={600} fz="md" style={{ fontSize: '1.125rem' }}>
                  {t(`features.items.${key}.title`)}
                </Text>
                <Text c="dimmed" fz="sm" style={{ fontSize: '0.9375rem' }}>
                  {key === 'jsConsole' ? (
                    <Trans
                      i18nKey={`features.items.${key}.description`}
                      components={{
                        code: <Code fz="0.875rem" />,
                      }}
                    />
                  ) : (
                    t(`features.items.${key}.description`)
                  )}
                </Text>
              </Stack>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>
    </Container>
  );
}
