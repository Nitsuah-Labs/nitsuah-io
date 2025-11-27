import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../../app/_components/_site/Footer";
import HomeBar from "../../../../app/_components/_site/Homebar";
import { blogPosts } from "../../../../lib/data/blogs";
import "./BlogPost.module.css";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.published);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.published);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <HomeBar />
      <main
        style={{
          marginTop: "80px",
          marginBottom: "60px",
          paddingBottom: "80px",
          minHeight: "calc(100vh - 140px)",
        }}
      >
        <article
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "2rem 1rem",
          }}
        >
          {/* Back Button */}
          <Link
            href="/projects/blogs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#3b82f6",
              textDecoration: "none",
              marginBottom: "2rem",
              fontSize: "0.95rem",
              transition: "opacity 0.2s ease",
            }}
            className="blog-back-link"
          >
            ← Back to Blog
          </Link>

          {/* Category Badge */}
          <div
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              background: "rgba(59, 130, 246, 0.2)",
              border: "2px solid rgba(59, 130, 246, 0.4)",
              color: "#3b82f6",
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
            }}
          >
            {post.category}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "700",
              color: "#fff",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
            }}
          >
            {post.title}
          </h1>

          {/* Meta Info */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
              paddingBottom: "2rem",
              marginBottom: "2rem",
              borderBottom: "2px solid rgba(59, 130, 246, 0.3)",
              fontSize: "0.95rem",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <span style={{ fontWeight: "600", color: "#fff" }}>
              {post.author}
            </span>
            <span>•</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "3rem",
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.875rem",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div
            className="blog-content"
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "1.125rem",
              lineHeight: "1.8",
            }}
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(post.content),
            }}
          />

          {/* Share Section */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "2px solid rgba(59, 130, 246, 0.3)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "1rem",
              }}
            >
              Thanks for reading!
            </p>
            <Link
              href="/projects/blogs"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                background: "#3b82f6",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                transition: "background 0.2s ease",
              }}
              className="blog-cta-button"
            >
              Read More Articles
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

// Basic markdown-to-HTML converter
function formatMarkdown(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(
    /^### (.*$)/gm,
    '<h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem; line-height: 1.3;">$1</h3>',
  );
  html = html.replace(
    /^## (.*$)/gm,
    '<h2 style="font-size: 1.875rem; font-weight: 700; color: #fff; margin: 2.5rem 0 1rem; line-height: 1.3;">$1</h2>',
  );
  html = html.replace(
    /^# (.*$)/gm,
    '<h1 style="font-size: 2.25rem; font-weight: 700; color: #fff; margin: 3rem 0 1rem; line-height: 1.2;">$1</h1>',
  );

  // Code blocks
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre style="background: rgba(0, 0, 0, 0.4); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1.5rem; overflow-x: auto; margin: 1.5rem 0; font-size: 0.95rem;"><code style="color: #e0e0e0; font-family: \'Courier New\', monospace;">$2</code></pre>',
  );

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    "<code style=\"background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; font-family: 'Courier New', monospace;\">$1</code>",
  );

  // Bold
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong style="color: #fff; font-weight: 600;">$1</strong>',
  );

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em style="font-style: italic;">$1</em>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none; border-bottom: 1px solid rgba(59, 130, 246, 0.5); transition: border-color 0.2s ease;">$1</a>',
  );

  // Blockquotes
  html = html.replace(
    /^> (.+$)/gm,
    '<blockquote style="border-left: 4px solid #3b82f6; padding-left: 1.5rem; margin: 1.5rem 0; color: rgba(255, 255, 255, 0.7); font-style: italic;">$1</blockquote>',
  );

  // Lists
  html = html.replace(
    /^\- (.+$)/gm,
    '<li style="margin: 0.5rem 0; padding-left: 0.5rem;">$1</li>',
  );
  // Wrap consecutive list items in ul tags
  html = html.replace(
    /(<li[^>]*>.*?<\/li>\s*)+/g,
    (match) =>
      `<ul style="list-style-type: disc; margin: 1rem 0; padding-left: 2rem; color: rgba(255, 255, 255, 0.85);">${match}</ul>`,
  );

  // Paragraphs (split by double newlines)
  const paragraphs = html.split("\n\n");
  html = paragraphs
    .map((p) => {
      p = p.trim();
      if (!p) return "";
      // Skip if already wrapped in HTML tag
      if (p.match(/^<(h[1-6]|pre|ul|ol|blockquote|div)/)) {
        return p;
      }
      return `<p style="margin: 1.25rem 0; line-height: 1.8;">${p}</p>`;
    })
    .join("\n");

  return html;
}
