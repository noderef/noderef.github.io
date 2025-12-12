import { Button, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

type Language = {
  code: string;
  labelKey: string;
  flagClass: string;
};

const languages: Language[] = [
  { code: 'de', labelKey: 'language.deutsch', flagClass: 'fi fi-de' },
  { code: 'en', labelKey: 'language.english', flagClass: 'fi fi-gb' },
  { code: 'fr', labelKey: 'language.français', flagClass: 'fi fi-fr' },
  { code: 'nl', labelKey: 'language.nederlands', flagClass: 'fi fi-nl' },
];

const FlagIcon = ({ flagClass, label }: { flagClass: string; label: string }) => (
  <span className={`${flagClass} flagIcon`} role="img" aria-label={`${label} flag`} />
);

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = languages.find((lang) => lang.code === i18n.language) || languages[0];

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
          {t(current.labelKey)}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {languages.map((language) => (
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
