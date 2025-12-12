import { useComputedColorScheme } from '@mantine/core';
import logoUrl from '@/assets/logo.svg';
import logoSmallUrl from '@/assets/logo-small.svg';

type LogoVariant = 'full' | 'mark';

type LogoProps = {
  height?: number;
  variant?: LogoVariant;
};

const ASPECT_RATIOS: Record<LogoVariant, number> = {
  full: 457.5 / 79.84,
  mark: 1540 / 1536.96,
};

const ASSET_BY_VARIANT: Record<LogoVariant, string> = {
  full: logoUrl,
  mark: logoSmallUrl,
};

export function Logo({ height = 28, variant = 'full' }: LogoProps) {
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const color = colorScheme === 'dark' ? 'var(--mantine-color-white)' : '#000';
  const asset = ASSET_BY_VARIANT[variant];
  const aspectRatio = ASPECT_RATIOS[variant];

  return (
    <span
      role="img"
      aria-label="NodeRef logo"
      style={{
        display: 'inline-block',
        width: height * aspectRatio,
        height,
        backgroundColor: color,
        maskImage: `url(${asset})`,
        WebkitMaskImage: `url(${asset})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  );
}
