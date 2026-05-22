import { Button, Menu } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MOBILE_HEADER_MEDIA_QUERY } from '@/constants/layout';

type Language = {
  code: string;
  labelKey: string;
  flagClass: string;
};

const languages: Language[] = [
  { code: 'en', labelKey: 'language.english', flagClass: 'fi fi-gb' },
  { code: 'es', labelKey: 'language.español', flagClass: 'fi fi-es' },
  { code: 'de', labelKey: 'language.deutsch', flagClass: 'fi fi-de' },
  { code: 'fr', labelKey: 'language.français', flagClass: 'fi fi-fr' },
  { code: 'nl', labelKey: 'language.nederlands', flagClass: 'fi fi-nl' },
];

const FlagIcon = ({ flagClass, label }: { flagClass: string; label: string }) => (
  <span className={`${flagClass} flagIcon`} role="img" aria-label={`${label} flag`} />
);

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const isMobile = useMediaQuery(MOBILE_HEADER_MEDIA_QUERY);
  const current = languages.find((lang) => lang.code === i18n.language) || languages[0];
  const sortedLanguages = useMemo(
    () =>
      [...languages].sort((a, b) =>
        t(a.labelKey).localeCompare(t(b.labelKey), i18n.language, { sensitivity: 'base' }),
      ),
    [i18n.language, t],
  );

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    // Save selected language to localStorage
    localStorage.setItem('noderef-language', code);
  };

  return (
    <Menu width={160} position="bottom-end" withinPortal>
      <Menu.Target>
        <Button
          variant="default"
          size="sm"
          leftSection={<FlagIcon flagClass={current.flagClass} label={t(current.labelKey)} />}
          rightSection={<IconChevronDown size={14} />}
        >
          {!isMobile ? t(current.labelKey) : ''}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {sortedLanguages.map((language) => (
          <Menu.Item
            key={language.code}
            leftSection={<FlagIcon flagClass={language.flagClass} label={t(language.labelKey)} />}
            onClick={() => handleLanguageChange(language.code)}
          >
            {t(language.labelKey)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
