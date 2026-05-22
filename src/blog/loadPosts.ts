import type { BlogFrontmatter, BlogPost } from './types';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DEFAULT_LOCALE = 'en';

const markdownFiles = import.meta.glob('../content/blog/*/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

type BlogPostVariant = BlogPost & {
  locale: string;
  postId: string;
};

let cachedPostVariantsById: ReadonlyMap<string, ReadonlyMap<string, BlogPostVariant>> | null = null;
const cachedPostsByLocale = new Map<string, readonly BlogPost[]>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeSlugValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeLocale(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return DEFAULT_LOCALE;
  }

  return trimmed.split('-')[0];
}

type ParsedMarkdown = {
  frontmatter: Record<string, unknown>;
  content: string;
};

function createContentError(sourcePath: string, message: string): Error {
  if (import.meta.env.DEV) {
    return new Error(`[blog] ${sourcePath}: ${message}`);
  }

  return new Error('[blog] Invalid blog content.');
}

function parseScalar(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function parseInlineTagList(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return [];
  }

  const inner = trimmed.slice(1, -1).trim();
  if (!inner) {
    return [];
  }

  return inner
    .split(',')
    .map((item) => parseScalar(item))
    .filter((item) => item.length > 0);
}

function parseFrontmatterBlock(block: string, sourcePath: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = block.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
    if (!keyValueMatch) {
      throw createContentError(sourcePath, `Invalid frontmatter syntax: "${line}".`);
    }

    const key = keyValueMatch[1];
    const rawValue = keyValueMatch[2] ?? '';

    if (key === 'tags' && rawValue.trim().length === 0) {
      const tags: string[] = [];
      index += 1;

      while (index < lines.length) {
        const itemLine = lines[index];

        if (!itemLine.trim()) {
          index += 1;
          continue;
        }

        const itemMatch = itemLine.match(/^\s*-\s+(.+)$/);
        if (!itemMatch) {
          break;
        }

        tags.push(parseScalar(itemMatch[1]));
        index += 1;
      }

      result.tags = tags;
      continue;
    }

    if (key === 'tags' && rawValue.trim().startsWith('[')) {
      result.tags = parseInlineTagList(rawValue);
      index += 1;
      continue;
    }

    result[key] = parseScalar(rawValue);
    index += 1;
  }

  return result;
}

function parseMarkdownFile(markdown: string, sourcePath: string): ParsedMarkdown {
  const normalizedInput = markdown.replace(/^\uFEFF/, '');
  const frontmatterMatch = normalizedInput.match(
    /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/,
  );

  if (!frontmatterMatch) {
    throw createContentError(sourcePath, 'Missing frontmatter block wrapped by "---" lines.');
  }

  const [, frontmatterBlock, content] = frontmatterMatch;

  return {
    frontmatter: parseFrontmatterBlock(frontmatterBlock, sourcePath),
    content,
  };
}

function assertRequiredString(
  frontmatter: Record<string, unknown>,
  sourcePath: string,
  key: keyof Pick<BlogFrontmatter, 'title' | 'date' | 'description'>,
): string {
  const value = frontmatter[key];

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw createContentError(
      sourcePath,
      `Frontmatter field "${key}" is required and must be a string.`,
    );
  }

  return value.trim();
}

function assertValidDate(date: string, sourcePath: string): string {
  if (!DATE_PATTERN.test(date)) {
    throw createContentError(sourcePath, 'Frontmatter field "date" must match YYYY-MM-DD.');
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw createContentError(
      sourcePath,
      `Frontmatter field "date" is not a valid calendar date: "${date}".`,
    );
  }

  return date;
}

function parseTags(frontmatter: Record<string, unknown>, sourcePath: string): string[] {
  const tags = frontmatter.tags;

  if (tags === undefined) {
    return [];
  }

  if (
    !Array.isArray(tags) ||
    tags.some((tag) => typeof tag !== 'string' || tag.trim().length === 0)
  ) {
    throw createContentError(
      sourcePath,
      'Frontmatter field "tags" must be an array of non-empty strings.',
    );
  }

  return tags.map((tag) => tag.trim());
}

function fileSlugFromPath(path: string): string {
  const fileName = path.split('/').pop() ?? '';
  return fileName.replace(/\.md$/i, '');
}

function extractLocaleAndPostId(sourcePath: string): { locale: string; postId: string } {
  const match = sourcePath.match(/\/content\/blog\/([^/]+)\/([^/]+)\.md$/);

  if (!match) {
    throw createContentError(
      sourcePath,
      'Invalid blog file path. Expected "src/content/blog/<locale>/<post>.md".',
    );
  }

  return {
    locale: normalizeLocale(match[1]),
    postId: match[2],
  };
}

export function normalizeSlug(value: string): string | null {
  const normalized = normalizeSlugValue(value);
  return normalized.length > 0 ? normalized : null;
}

function toBlogPostVariant(sourcePath: string, markdown: string): BlogPostVariant {
  const { locale, postId } = extractLocaleAndPostId(sourcePath);
  const parsed = parseMarkdownFile(markdown, sourcePath);
  const frontmatter = parsed.frontmatter;

  if (!isRecord(frontmatter)) {
    throw createContentError(sourcePath, 'Frontmatter must be an object.');
  }

  const title = assertRequiredString(frontmatter, sourcePath, 'title');
  const date = assertValidDate(assertRequiredString(frontmatter, sourcePath, 'date'), sourcePath);
  const description = assertRequiredString(frontmatter, sourcePath, 'description');
  const tags = parseTags(frontmatter, sourcePath);

  const providedSlug = frontmatter.slug;
  if (
    providedSlug !== undefined &&
    (typeof providedSlug !== 'string' || providedSlug.trim().length === 0)
  ) {
    throw createContentError(
      sourcePath,
      'Frontmatter field "slug" must be a non-empty string when provided.',
    );
  }

  const fallbackSlug = postId || fileSlugFromPath(sourcePath);
  const rawSlug = typeof providedSlug === 'string' ? providedSlug : fallbackSlug;
  const normalizedSlug = normalizeSlug(rawSlug);

  if (!normalizedSlug) {
    throw createContentError(sourcePath, `Could not derive a valid slug from "${rawSlug}".`);
  }

  return {
    title,
    date,
    description,
    slug: normalizedSlug,
    tags,
    content: parsed.content.trim(),
    sourcePath,
    locale,
    postId,
  };
}

function toPublicPost(variant: BlogPostVariant): BlogPost {
  return {
    title: variant.title,
    date: variant.date,
    description: variant.description,
    slug: variant.slug,
    tags: variant.tags,
    content: variant.content,
    sourcePath: variant.sourcePath,
  };
}

function selectVariant(
  variantsByLocale: ReadonlyMap<string, BlogPostVariant>,
  locale: string,
): BlogPostVariant {
  const direct = variantsByLocale.get(locale);
  if (direct) {
    return direct;
  }

  const english = variantsByLocale.get(DEFAULT_LOCALE);
  if (english) {
    return english;
  }

  const firstLocale = Array.from(variantsByLocale.keys()).sort()[0];
  const first = firstLocale ? variantsByLocale.get(firstLocale) : null;

  if (!first) {
    throw new Error('[blog] Missing blog variants for a post.');
  }

  return first;
}

function buildPostVariantsById(): ReadonlyMap<string, ReadonlyMap<string, BlogPostVariant>> {
  const variants = Object.entries(markdownFiles).map(([sourcePath, markdown]) =>
    toBlogPostVariant(sourcePath, markdown),
  );

  const slugSetByLocale = new Map<string, Set<string>>();
  for (const variant of variants) {
    const slugSet = slugSetByLocale.get(variant.locale) ?? new Set<string>();
    if (slugSet.has(variant.slug)) {
      throw createContentError(
        variant.sourcePath,
        `Duplicate slug detected for locale "${variant.locale}": "${variant.slug}".`,
      );
    }

    slugSet.add(variant.slug);
    slugSetByLocale.set(variant.locale, slugSet);
  }

  const mapByPostId = new Map<string, Map<string, BlogPostVariant>>();

  for (const variant of variants) {
    const locales = mapByPostId.get(variant.postId) ?? new Map<string, BlogPostVariant>();

    if (locales.has(variant.locale)) {
      throw createContentError(
        variant.sourcePath,
        `Duplicate locale "${variant.locale}" found for post "${variant.postId}".`,
      );
    }

    locales.set(variant.locale, variant);
    mapByPostId.set(variant.postId, locales);
  }

  return mapByPostId;
}

function getPostVariantsById(): ReadonlyMap<string, ReadonlyMap<string, BlogPostVariant>> {
  if (cachedPostVariantsById) {
    return cachedPostVariantsById;
  }

  cachedPostVariantsById = buildPostVariantsById();
  return cachedPostVariantsById;
}

export function getAllPosts(locale: string): readonly BlogPost[] {
  const normalizedLocale = normalizeLocale(locale);

  const cached = cachedPostsByLocale.get(normalizedLocale);
  if (cached) {
    return cached;
  }

  const posts = Array.from(getPostVariantsById().values()).map((variantsByLocale) =>
    toPublicPost(selectVariant(variantsByLocale, normalizedLocale)),
  );

  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  cachedPostsByLocale.set(normalizedLocale, posts);

  return posts;
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) {
    return null;
  }

  const normalizedLocale = normalizeLocale(locale);

  const directMatch = getAllPosts(normalizedLocale).find((post) => post.slug === normalizedSlug);
  if (directMatch) {
    return directMatch;
  }

  for (const variantsByLocale of getPostVariantsById().values()) {
    for (const variant of variantsByLocale.values()) {
      if (variant.slug === normalizedSlug) {
        return toPublicPost(selectVariant(variantsByLocale, normalizedLocale));
      }
    }
  }

  return null;
}
