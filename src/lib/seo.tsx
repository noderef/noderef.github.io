import { useEffect } from 'react';
import { buildHashShareUrl, getDefaultOgImageUrl, getSiteUrl } from '@/lib/appConfig';

function getOrCreateManagedMeta(attribute: 'name' | 'property', key: string): HTMLMetaElement {
  const selector = `meta[${attribute}="${CSS.escape(key)}"][data-noderef-seo]`;
  const existing = document.head.querySelector(selector);
  if (existing instanceof HTMLMetaElement) return existing;

  const meta = document.createElement('meta');
  meta.setAttribute(attribute, key);
  meta.setAttribute('data-noderef-seo', 'true');
  document.head.appendChild(meta);
  return meta;
}

function setPrimaryDescription(content: string): void {
  const existing = document.head.querySelector('meta[name="description"]');
  if (existing instanceof HTMLMetaElement) {
    existing.setAttribute('content', content);
    return;
  }
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'description');
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setCanonicalLink(href: string): void {
  const selector = 'link[rel="canonical"][data-noderef-seo]';
  let link = document.head.querySelector<HTMLLinkElement>(selector);
  if (!(link instanceof HTMLLinkElement)) {
    link = document.createElement('link');
    link.rel = 'canonical';
    link.setAttribute('data-noderef-seo', 'true');
    document.head.appendChild(link);
  }
  link.href = href;
}

function removeManagedSeoNodes(): void {
  document.head.querySelectorAll('[data-noderef-seo="true"]').forEach((node) => node.remove());
}

export type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
};

export function Seo({
  title,
  description,
  canonicalPath,
  noIndex,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogImage,
  twitterCard = 'summary',
}: SeoProps): null {
  useEffect(() => {
    document.title = title;
    setPrimaryDescription(description);

    const siteUrl = getSiteUrl();
    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDescription = ogDescription ?? description;
    const shareUrl =
      canonicalPath !== undefined && siteUrl
        ? buildHashShareUrl(siteUrl, canonicalPath)
        : undefined;
    const resolvedOgImage = ogImage ?? getDefaultOgImageUrl();

    getOrCreateManagedMeta('property', 'og:title').setAttribute('content', resolvedOgTitle);
    getOrCreateManagedMeta('property', 'og:description').setAttribute(
      'content',
      resolvedOgDescription,
    );
    getOrCreateManagedMeta('property', 'og:type').setAttribute('content', ogType);

    if (shareUrl) {
      getOrCreateManagedMeta('property', 'og:url').setAttribute('content', shareUrl);
      setCanonicalLink(shareUrl);
    } else {
      document.head.querySelector('link[rel="canonical"][data-noderef-seo]')?.remove();
      const ogUrl = document.head.querySelector('meta[property="og:url"][data-noderef-seo]');
      ogUrl?.remove();
    }

    if (resolvedOgImage) {
      getOrCreateManagedMeta('property', 'og:image').setAttribute('content', resolvedOgImage);
    } else {
      document.head.querySelector('meta[property="og:image"][data-noderef-seo]')?.remove();
    }

    getOrCreateManagedMeta('name', 'twitter:card').setAttribute('content', twitterCard);
    getOrCreateManagedMeta('name', 'twitter:title').setAttribute('content', resolvedOgTitle);
    getOrCreateManagedMeta('name', 'twitter:description').setAttribute(
      'content',
      resolvedOgDescription,
    );
    if (resolvedOgImage) {
      getOrCreateManagedMeta('name', 'twitter:image').setAttribute('content', resolvedOgImage);
    } else {
      document.head.querySelector('meta[name="twitter:image"][data-noderef-seo]')?.remove();
    }

    if (noIndex) {
      getOrCreateManagedMeta('name', 'robots').setAttribute('content', 'noindex, nofollow');
    } else {
      document.head.querySelector('meta[name="robots"][data-noderef-seo]')?.remove();
    }

    return () => {
      removeManagedSeoNodes();
    };
  }, [
    title,
    description,
    canonicalPath,
    noIndex,
    ogTitle,
    ogDescription,
    ogType,
    ogImage,
    twitterCard,
  ]);

  return null;
}
