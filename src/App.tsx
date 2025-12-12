import { AppShell } from '@mantine/core';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FeatureShowcase } from './components/FeatureShowcase';
import { Faq } from './components/Faq';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Logo } from './components/Logo';

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = `NodeRef - ${t('hero.title')}`;
  }, [t, i18n.language]);

  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Header
          mt="xl"
          mb="calc(var(--mantine-spacing-xl) * 1.5)"
          logo={<Logo />}
          mobileLogo={<Logo variant="mark" />}
          mobileBreakpoint={500}
        />
        <Hero />
        <Features />
        <FeatureShowcase />
        <Faq />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
