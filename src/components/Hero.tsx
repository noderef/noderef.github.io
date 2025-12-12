import { Badge, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import {
  IconBrandApple,
  IconBrandUbuntu,
  IconBrandWindows,
  IconDownload,
  IconLoader2,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGitHubRelease } from '../hooks/useGitHubRelease';

const DOWNLOAD_ROWS = [
  [
    { key: 'mac', icon: IconBrandApple },
    { key: 'windows', icon: IconBrandWindows },
    { key: 'linux', icon: IconBrandUbuntu },
  ],
  [{ key: 'macAppleSilicon', icon: IconBrandApple }],
] as const;

export function Hero() {
  const { t } = useTranslation();
  const { assets, loading, error } = useGitHubRelease();
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true, amount: 0.5 },
  });

  const getDownloadUrl = (key: string): string | undefined => {
    switch (key) {
      case 'windows':
        return assets.windows;
      case 'mac':
        return assets.mac;
      case 'macAppleSilicon':
        return assets.macAppleSilicon;
      case 'linux':
        return assets.linux;
      default:
        return undefined;
    }
  };

  return (
    <Container component="section" py="xl">
      <Stack align="center" gap="md">
        <motion.div {...fadeUp(0)}>
          <Badge size="lg" radius="md" variant="light" color="blue">
            {t('hero.badge')}
          </Badge>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <Title ta="center" order={1} size="h1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {t('hero.title')}
          </Title>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Text
            ta="center"
            fz="xl"
            c="dimmed"
            maw={680}
            style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)' }}
          >
            {t('hero.description')}
          </Text>
        </motion.div>

        <motion.div {...fadeUp(0.3)} style={{ width: '100%' }}>
          <Stack gap="sm" w="100%">
            {DOWNLOAD_ROWS.map((row) => {
              const rowKey = row.map(({ key }) => key).join('|');
              const isSingle = row.length === 1;

              return (
                <Group key={rowKey} justify="center" gap="sm">
                  {row.map(({ key, icon: Icon }) => {
                    const downloadUrl = getDownloadUrl(key);
                    const isDisabled = loading || !downloadUrl;

                    return (
                      <Button
                        key={key}
                        component={downloadUrl ? 'a' : 'button'}
                        href={downloadUrl}
                        download={!!downloadUrl}
                        radius="md"
                        size="md"
                        variant="filled"
                        color="blue"
                        disabled={isDisabled}
                        leftSection={
                          loading ? (
                            <IconLoader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                          ) : (
                            <Icon size={18} />
                          )
                        }
                        rightSection={!loading && <IconDownload size={16} />}
                        style={{ minWidth: isSingle ? 220 : 200 }}
                      >
                        {t(`hero.download.${key}`)}
                      </Button>
                    );
                  })}
                </Group>
              );
            })}
          </Stack>
          {error && (
            <Text ta="center" c="red" size="sm" mt="xs">
              {t('hero.download.error', { defaultValue: 'Unable to load download links. Please visit GitHub releases.' })}
            </Text>
          )}
        </motion.div>
      </Stack>
    </Container>
  );
}
