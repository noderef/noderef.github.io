import { useTranslation } from 'react-i18next';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { Faq } from '@/components/Faq';
import { Features } from '@/components/Features';
import { Hero } from '@/components/Hero';
import { PageShell } from '@/components/PageShell';
import { WhatsNewBanner } from '@/components/WhatsNewBanner';
import { Seo } from '@/lib/seo';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <Seo
        title={`${t('seo.siteName')} - ${t('hero.title')}`}
        description={t('seo.home.description')}
        canonicalPath="/"
      />
      <WhatsNewBanner />
      <Hero />
      <Features />
      <FeatureShowcase />
      <Faq />
    </PageShell>
  );
}
