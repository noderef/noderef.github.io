import {
  ActionIcon,
  Anchor,
  Badge,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import { getPostBySlug } from '@/blog/loadPosts';
import { PageShell } from '@/components/PageShell';
import { Seo } from '@/lib/seo';

export function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(
    () => (slug ? getPostBySlug(slug, i18n.language) : null),
    [slug, i18n.language],
  );

  if (!post) {
    return (
      <PageShell>
        <Seo
          title={t('seo.blogNotFound.title')}
          description={t('seo.blogNotFound.description')}
          noIndex
        />
        <Container size="md" pb="xl">
          <Paper withBorder radius="md" p="lg">
            <Stack gap="sm">
              <Title order={1}>Post not found</Title>
              <Text c="dimmed">The requested blog post does not exist.</Text>
              <Anchor component={Link} to="/blog" fw={600}>
                Back to blog
              </Anchor>
            </Stack>
          </Paper>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Seo
        title={`${t('seo.siteName')} - ${post.title}`}
        description={post.description}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
      />
      <Container size="md" pb="xl">
        <Stack gap="lg">
          <ActionIcon
            component={Link}
            to="/blog"
            variant="default"
            radius="xl"
            size="lg"
            aria-label="Back to blog"
          >
            <IconArrowLeft size={18} />
          </ActionIcon>

          <header>
            <Stack gap="xs">
              <Title order={1}>{post.title}</Title>
              <Text size="sm" c="dimmed">
                {post.date}
              </Text>
              <Text>{post.description}</Text>
              {post.tags.length > 0 ? (
                <Group gap="xs">
                  {post.tags.map((tag) => (
                    <Badge key={`${post.slug}-${tag}`} variant="light" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              ) : null}
            </Stack>
          </header>

          <div className="blogMarkdown">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </Stack>
      </Container>
    </PageShell>
  );
}
