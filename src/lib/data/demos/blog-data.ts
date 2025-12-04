/**
 * Mock data for Blog CMS Demo
 */

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  status: "published" | "draft";
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Next.js 16",
    excerpt:
      "Learn the fundamentals of Next.js 16 and its App Router architecture",
    content:
      "Next.js 16 brings powerful new features including improved performance, better developer experience, and enhanced routing capabilities...",
    author: "John Developer",
    date: "2024-01-15",
    category: "Web Development",
    status: "published",
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices for creating robust and maintainable REST APIs",
    content:
      "When building APIs at scale, architecture and design patterns become crucial. In this guide, we'll explore proven strategies...",
    author: "Sarah Tech",
    date: "2024-01-10",
    category: "Backend",
    status: "published",
  },
  {
    id: 3,
    title: "Modern CSS Techniques",
    excerpt:
      "Explore CSS Grid, Flexbox, and custom properties for modern layouts",
    content:
      "CSS has evolved tremendously. Modern techniques like Grid and Flexbox have revolutionized how we build responsive layouts...",
    author: "Alex Designer",
    date: "2024-01-05",
    category: "Frontend",
    status: "published",
  },
  {
    id: 4,
    title: "TypeScript Best Practices 2024",
    excerpt: "Essential TypeScript patterns every developer should know",
    content:
      "TypeScript continues to be the go-to language for type-safe JavaScript development. Here are the latest best practices...",
    author: "John Developer",
    date: "2024-01-20",
    category: "Programming",
    status: "published",
  },
  {
    id: 5,
    title: "Database Optimization Strategies",
    excerpt: "Improve query performance and reduce database load",
    content:
      "Database performance can make or break your application. This comprehensive guide covers indexing, query optimization...",
    author: "Sarah Tech",
    date: "2024-01-18",
    category: "Backend",
    status: "draft",
  },
  {
    id: 6,
    title: "React Server Components Deep Dive",
    excerpt: "Understanding the power of React Server Components",
    content:
      "React Server Components represent a paradigm shift in how we think about rendering. Let's explore their benefits...",
    author: "Alex Designer",
    date: "2024-01-22",
    category: "Web Development",
    status: "published",
  },
  {
    id: 7,
    title: "Authentication Patterns in 2024",
    excerpt: "Modern approaches to user authentication and authorization",
    content:
      "Security is paramount in modern applications. This article explores JWT, OAuth, and session-based auth patterns...",
    author: "John Developer",
    date: "2024-01-12",
    category: "Security",
    status: "published",
  },
  {
    id: 8,
    title: "Microservices Architecture Guide",
    excerpt: "When and how to implement microservices effectively",
    content:
      "Microservices offer scalability and flexibility but come with complexity. Learn when they make sense...",
    author: "Sarah Tech",
    date: "2024-01-08",
    category: "Architecture",
    status: "draft",
  },
];

export const initialNewPost: Partial<BlogPost> = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  category: "",
  status: "draft",
};

export const blogCategories = [
  "Web Development",
  "Backend",
  "Frontend",
  "Programming",
  "Security",
  "Architecture",
];
