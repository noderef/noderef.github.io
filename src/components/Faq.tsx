import { Anchor, Container, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

type Faq = {
  value: string;
};

const FAQ: Faq[] = [
  { value: 'whatIsNodeRef' },
  { value: 'community' },
  { value: 'whyDesktop' },
  { value: 'consoleModule' },
  { value: 'multiServer' },
  { value: 'cost' },
];

const FaqCell = ({ value }: Faq) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Paper withBorder radius="md" p="lg" style={{ height: '100%' }}>
        <Text fz="lg" fw="bold" mb={6}>
          {t(`faq.items.${value}.question`)}
        </Text>
        <Text fz="md" c="dimmed">
          {value === 'consoleModule' ? (
            <Trans
              i18nKey={`faq.items.${value}.answer`}
              components={{
                supportToolsLink: (
                  <Anchor
                    href="https://github.com/OrderOfTheBee/ootbee-support-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    fw={700}
                  />
                ),
              }}
            />
          ) : (
            t(`faq.items.${value}.answer`)
          )}
        </Text>
      </Paper>
    </motion.div>
  );
};

export const Faq = () => {
  const { t } = useTranslation();

  return (
    <Container component="section" py="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <Stack gap="xs" align="center" mb="lg">
          <Title order={2} ta="center">
            {t('faq.title')}
          </Title>
          <Text c="dimmed" ta="center" fz="lg" maw={640}>
            <Trans
              i18nKey="faq.description"
              components={{
                email: (
                  <Anchor href="#" underline="always" c="dimmed" inherit>
                    email
                  </Anchor>
                ),
              }}
            />
          </Text>
        </Stack>
      </motion.div>
      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
        {FAQ.map((faq) => (
          <FaqCell key={faq.value} {...faq} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
