import { Anchor, Badge, Container, Group, Paper, Stack, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getAllPosts } from '@/blog/loadPosts';
import { PageShell } from '@/components/PageShell';
import { Seo } from '@/lib/seo';

export function BlogIndexPage() {
  const { t, i18n } = useTranslation();
  const posts = useMemo(() => getAllPosts(i18n.language), [i18n.language]);

  return (
    <PageShell>
      <Seo
        title={t('seo.blogIndex.title')}
        description={t('seo.blogIndex.description')}
        canonicalPath="/blog"
      />
      <Container size="md" pb="xl">
        {posts.length === 0 ? (
          <Paper withBorder radius="md" p="lg">
            <Text>No blog posts found.</Text>
          </Paper>
        ) : (
          <Stack gap="md">
            {posts.map((post) => (
              <Paper key={post.slug} withBorder radius="md" p="lg">
                <Stack gap="xs">
                  <Anchor component={Link} to={`/blog/${post.slug}`} fw={700} fz="lg">
                    {post.title}
                  </Anchor>
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
              </Paper>
            ))}
          </Stack>
        )}
      </Container>
    </PageShell>
  );
}
