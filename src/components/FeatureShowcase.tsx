import {
  Accordion,
  Container,
  Grid,
  Image,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  type MantineBreakpoint,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import executeGif from '../assets/jsconsole-execute-multi-server.gif';
import searchGif from '../assets/search-multi-server.gif';
import nodeBrowserGif from '../assets/node-browser.gif';

type FeatureItem = {
  value: string;
};

const ITEMS: FeatureItem[] = [
  { value: 'executeJs' },
  { value: 'searchMultiServer' },
  { value: 'nodeBrowser' },
] as const;

type Props = {
  collapseBreakpoint?: MantineBreakpoint;
};

export function FeatureShowcase({ collapseBreakpoint = 'md' }: Props) {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>(ITEMS[0].value);
  const [previewOpen, setPreviewOpen] = useState(false);
  const current = ITEMS.find((item) => item.value === active) ?? ITEMS[0];

  useEffect(() => {
    setPreviewOpen(false);
  }, [active]);

  const imageSrcs: Record<string, string> = {
    executeJs: executeGif,
    searchMultiServer: searchGif,
    nodeBrowser: nodeBrowserGif,
  };

  return (
    <Container component="section" py="xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Paper withBorder radius="md" p="xl">
          <Grid gutter="xl" align="stretch">
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Stack gap="sm">
                <Title order={3}>{t('featureShowcase.title')}</Title>
                <Text c="dimmed">{t('featureShowcase.description')}</Text>
                <Accordion
                  value={active}
                  onChange={(value) => value && setActive(value)}
                  variant="separated"
                >
                  {ITEMS.map((item) => (
                    <Accordion.Item key={item.value} value={item.value}>
                      <Accordion.Control>
                        {t(`featureShowcase.items.${item.value}.title`)}
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Text c="dimmed">
                          {t(`featureShowcase.items.${item.value}.description`)}
                        </Text>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 6 }} visibleFrom={collapseBreakpoint}>
              <Stack h="100%" justify="center">
                <>
                  <motion.div
                    key={current.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={imageSrcs[current.value]}
                      alt={t(`featureShowcase.items.${current.value}.imageAlt`)}
                      radius="md"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setPreviewOpen(true)}
                    />
                  </motion.div>

                  <Modal
                    opened={previewOpen}
                    onClose={() => setPreviewOpen(false)}
                    title={t(`featureShowcase.items.${current.value}.title`)}
                    size="xl"
                    centered
                    overlayProps={{ blur: 3 }}
                  >
                    <Image
                      src={imageSrcs[current.value]}
                      alt={t(`featureShowcase.items.${current.value}.imageAlt`)}
                      radius="md"
                    />
                  </Modal>
                </>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
}
