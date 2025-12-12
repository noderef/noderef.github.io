import { Title, TitleProps } from '@mantine/core';

type JumboTitleProps = TitleProps;

export function JumboTitle({ children, fz, fw, style, ...others }: JumboTitleProps) {
  return (
    <Title
      fz={fz ?? { base: 32, sm: 40, md: 48 }}
      fw={fw ?? 800}
      style={{ lineHeight: 1.1, ...style }}
      {...others}
    >
      {children}
    </Title>
  );
}
