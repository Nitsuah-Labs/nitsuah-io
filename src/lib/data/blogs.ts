import blogsData from "@/data/blogs.json";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  readTime: string;
  published: boolean;
  localOnly?: boolean;
}

export const blogPosts: BlogPost[] = (blogsData as BlogPost[]).map((post) => ({
  ...post,
  localOnly: false,
}));
