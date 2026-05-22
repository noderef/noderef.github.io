export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
  slug?: string;
  tags?: string[];
};

export type BlogPost = {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
  content: string;
  sourcePath: string;
};
