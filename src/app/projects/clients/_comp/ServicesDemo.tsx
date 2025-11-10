// Services Demo - Restaurant & Blog CMS
"use client";
import React, { useState } from "react";

interface ServicesDemoProps {
  type?: "restaurant" | "blog-cms";
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  status: "published" | "draft";
}

export const ServicesDemo: React.FC<ServicesDemoProps> = ({
  type = "restaurant",
}) => {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "menu"
    | "booking"
    | "pickup"
    | "dashboard"
    | "posts"
    | "create"
    | "edit"
  >(type === "blog-cms" ? "dashboard" : "home");
  const [reservationDate, setReservationDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [pickupPhone, setPickupPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  // Blog CMS state
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      excerpt:
        "Learn the fundamentals of Next.js 14 and its App Router architecture",
      content:
        "Next.js 14 brings powerful new features including improved performance, better developer experience, and enhanced routing capabilities...",
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
  ]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    status: "draft",
  });
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  // Blog CMS handlers
  const createPost = () => {
    if (
      !newPost.title ||
      !newPost.excerpt ||
      !newPost.content ||
      !newPost.author
    )
      return;

    const post: BlogPost = {
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      author: newPost.author,
      category: newPost.category || "Uncategorized",
      date: new Date().toISOString().split("T")[0],
      status: (newPost.status as "published" | "draft") || "draft",
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      status: "draft",
    });
    setCurrentPage("posts");
  };

  const updatePost = () => {
    if (!editingPost) return;

    setPosts(posts.map((p) => (p.id === editingPost.id ? editingPost : p)));
    setEditingPost(null);
    setCurrentPage("posts");
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    setShowDeleteModal(null);
  };

  const togglePostStatus = (id: number) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "published" ? "draft" : "published" }
          : p,
      ),
    );
  };

  const menuItems = [
    // Starters/Antipasti
    {
      name: "Bruschetta al Pomodoro",
      price: "$12",
      category: "Starters",
      icon: "🥖",
      description: "Toasted bread with fresh tomatoes, basil & garlic",
    },
    {
      name: "Caprese Salad",
      price: "$14",
      category: "Starters",
      icon: "🥗",
      description: "Fresh mozzarella, tomatoes, basil & balsamic",
    },
    {
      name: "Calamari Fritti",
      price: "$16",
      category: "Starters",
      icon: "🦑",
      description: "Crispy fried squid with lemon aioli",
    },
    {
      name: "Prosciutto e Melone",
      price: "$15",
      category: "Starters",
      icon: "🍈",
      description: "Cured ham with fresh cantaloupe",
    },

    // Pasta
    {
      name: "Spaghetti Carbonara",
      price: "$18",
      category: "Pasta",
      icon: "🍝",
      description: "Eggs, pancetta, pecorino romano & black pepper",
    },
    {
      name: "Fettuccine Alfredo",
      price: "$17",
      category: "Pasta",
      icon: "🍝",
      description: "Creamy parmesan sauce with butter",
    },
    {
      name: "Penne Arrabbiata",
      price: "$16",
      category: "Pasta",
      icon: "🍝",
      description: "Spicy tomato sauce with garlic & chili",
    },
    {
      name: "Lasagna Bolognese",
      price: "$20",
      category: "Pasta",
      icon: "🍝",
      description: "Layers of pasta, meat sauce & béchamel",
    },
    {
      name: "Ravioli Ricotta",
      price: "$19",
      category: "Pasta",
      icon: "🥟",
      description: "Ricotta-filled pasta with sage butter sauce",
    },

    // Pizza
    {
      name: "Margherita Pizza",
      price: "$16",
      category: "Pizza",
      icon: "🍕",
      description: "Tomato sauce, mozzarella, fresh basil",
    },
    {
      name: "Quattro Formaggi",
      price: "$19",
      category: "Pizza",
      icon: "🍕",
      description: "Four cheese blend on thin crust",
    },
    {
      name: "Prosciutto e Rucola",
      price: "$21",
      category: "Pizza",
      icon: "🍕",
      description: "Prosciutto, arugula & shaved parmesan",
    },
    {
      name: "Diavola",
      price: "$18",
      category: "Pizza",
      icon: "🍕",
      description: "Spicy salami with chili oil",
    },

    // Main Courses
    {
      name: "Osso Buco",
      price: "$32",
      category: "Mains",
      icon: "🍖",
      description: "Braised veal shanks with risotto Milanese",
    },
    {
      name: "Pollo alla Parmigiana",
      price: "$24",
      category: "Mains",
      icon: "🍗",
      description: "Breaded chicken with tomato & mozzarella",
    },
    {
      name: "Branzino al Forno",
      price: "$28",
      category: "Mains",
      icon: "🐟",
      description: "Oven-roasted sea bass with herbs",
    },
    {
      name: "Bistecca Fiorentina",
      price: "$42",
      category: "Mains",
      icon: "🥩",
      description: "T-bone steak grilled to perfection",
    },

    // Desserts
    {
      name: "Tiramisu",
      price: "$10",
      category: "Desserts",
      icon: "🍰",
      description: "Classic coffee-soaked ladyfingers & mascarpone",
    },
    {
      name: "Panna Cotta",
      price: "$9",
      category: "Desserts",
      icon: "🍮",
      description: "Vanilla cream with berry compote",
    },
    {
      name: "Cannoli Siciliani",
      price: "$11",
      category: "Desserts",
      icon: "🥐",
      description: "Crispy shells filled with sweet ricotta",
    },
    {
      name: "Gelato Artigianale",
      price: "$8",
      category: "Desserts",
      icon: "🍨",
      description: "Homemade Italian ice cream (3 scoops)",
    },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background:
            type === "blog-cms"
              ? "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)"
              : "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
          padding: "2rem 1.5rem",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 0.5rem 0",
          }}
        >
          {type === "blog-cms" ? "📝 TechBlog CMS" : "🍽️ Bella Vista"}
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
          {type === "blog-cms"
            ? "Content Management System"
            : "Authentic Italian Cuisine"}
        </p>
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1rem",
          background:
            type === "blog-cms"
              ? "rgba(139, 92, 246, 0.1)"
              : "rgba(236, 72, 153, 0.1)",
          borderBottom:
            type === "blog-cms"
              ? "2px solid rgba(139, 92, 246, 0.3)"
              : "2px solid rgba(236, 72, 153, 0.3)",
          flexWrap: "wrap",
        }}
      >
        {type === "blog-cms" ? (
          <>
            <button
              onClick={() => setCurrentPage("dashboard")}
              style={{
                padding: "0.75rem 1rem",
                background:
                  currentPage === "dashboard"
                    ? "rgba(139, 92, 246, 0.3)"
                    : "transparent",
                border:
                  currentPage === "dashboard"
                    ? "2px solid #8b5cf6"
                    : "2px solid rgba(139, 92, 246, 0.3)",
                color:
                  currentPage === "dashboard"
                    ? "#8b5cf6"
                    : "rgba(255, 255, 255, 0.7)",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              <span>📊</span> Dashboard
            </button>
            <button
              onClick={() => setCurrentPage("posts")}
              style={{
                padding: "0.75rem 1rem",
                background:
                  currentPage === "posts"
                    ? "rgba(139, 92, 246, 0.3)"
                    : "transparent",
                border:
                  currentPage === "posts"
                    ? "2px solid #8b5cf6"
                    : "2px solid rgba(139, 92, 246, 0.3)",
                color:
                  currentPage === "posts"
                    ? "#8b5cf6"
                    : "rgba(255, 255, 255, 0.7)",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              <span>📚</span> All Posts
            </button>
            <button
              onClick={() => {
                setNewPost({
                  title: "",
                  excerpt: "",
                  content: "",
                  author: "",
                  category: "",
                  status: "draft",
                });
                setCurrentPage("create");
              }}
              style={{
                padding: "0.75rem 1rem",
                background:
                  currentPage === "create"
                    ? "rgba(139, 92, 246, 0.3)"
                    : "transparent",
                border:
                  currentPage === "create"
                    ? "2px solid #8b5cf6"
                    : "2px solid rgba(139, 92, 246, 0.3)",
                color:
                  currentPage === "create"
                    ? "#8b5cf6"
                    : "rgba(255, 255, 255, 0.7)",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              <span>✏️</span> Create Post
            </button>
          </>
        ) : (
          <>
            {[
              { id: "home", label: "Home", icon: "🏠" },
              { id: "menu", label: "Menu", icon: "📋" },
              { id: "pickup", label: "Mobile Pickup", icon: "📱" },
              { id: "booking", label: "Reservations", icon: "📅" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as any)}
                style={{
                  padding: "0.75rem 1rem",
                  background:
                    currentPage === item.id
                      ? "rgba(236, 72, 153, 0.3)"
                      : "transparent",
                  border:
                    currentPage === item.id
                      ? "2px solid #ec4899"
                      : "2px solid rgba(236, 72, 153, 0.3)",
                  color:
                    currentPage === item.id
                      ? "#ec4899"
                      : "rgba(255, 255, 255, 0.7)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </>
        )}
      </nav>

      {/* Page Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "400px" }}>
        {type === "blog-cms" && currentPage === "dashboard" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
              }}
            >
              Dashboard
            </h2>

            {/* Quick Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "2px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                  }}
                >
                  {posts.length}
                </div>
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Total Posts
                </div>
              </div>
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "2px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#10b981",
                    marginBottom: "0.5rem",
                  }}
                >
                  {posts.filter((p) => p.status === "published").length}
                </div>
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Published
                </div>
              </div>
              <div
                style={{
                  background: "rgba(234, 179, 8, 0.1)",
                  border: "2px solid rgba(234, 179, 8, 0.3)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#eab308",
                    marginBottom: "0.5rem",
                  }}
                >
                  {posts.filter((p) => p.status === "draft").length}
                </div>
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>Drafts</div>
              </div>
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#3b82f6",
                    marginBottom: "0.5rem",
                  }}
                >
                  {[...new Set(posts.map((p) => p.category))].length}
                </div>
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Categories
                </div>
              </div>
            </div>

            {/* Latest Posts */}
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                }}
              >
                📝 Latest Posts
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {posts
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
                  )
                  .slice(0, 3)
                  .map((post) => (
                    <div
                      key={post.id}
                      style={{
                        background: "rgba(139, 92, 246, 0.05)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "8px",
                        padding: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#8b5cf6",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {post.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          {post.date} • {post.author}
                        </div>
                      </div>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          background:
                            post.status === "published"
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(234, 179, 8, 0.2)",
                          border:
                            post.status === "published"
                              ? "1px solid rgba(16, 185, 129, 0.4)"
                              : "1px solid rgba(234, 179, 8, 0.4)",
                          color:
                            post.status === "published" ? "#10b981" : "#eab308",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          textTransform: "uppercase",
                        }}
                      >
                        {post.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                }}
              >
                🔥 Popular Posts
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {posts
                  .filter((p) => p.status === "published")
                  .slice(0, 3)
                  .map((post) => (
                    <div
                      key={post.id}
                      style={{
                        background: "rgba(139, 92, 246, 0.05)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "8px",
                        padding: "1rem",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#8b5cf6",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {post.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255, 255, 255, 0.7)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {post.excerpt}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        🏷️ {post.category}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Categories Overview */}
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                }}
              >
                📂 Categories
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                {[...new Set(posts.map((p) => p.category))].map((category) => {
                  const count = posts.filter(
                    (p) => p.category === category,
                  ).length;
                  return (
                    <div
                      key={category}
                      style={{
                        background: "rgba(139, 92, 246, 0.05)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "8px",
                        padding: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: "#8b5cf6", fontWeight: "600" }}>
                        {category}
                      </span>
                      <span
                        style={{
                          background: "rgba(139, 92, 246, 0.2)",
                          color: "#8b5cf6",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "12px",
                          fontSize: "0.875rem",
                          fontWeight: "700",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {type === "blog-cms" && currentPage === "posts" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
              }}
            >
              All Posts
            </h2>

            <div style={{ display: "grid", gap: "1rem" }}>
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "2px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          color: "#8b5cf6",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {post.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          fontSize: "0.875rem",
                          color: "rgba(255, 255, 255, 0.6)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <span>👤 {post.author}</span>
                        <span>📅 {post.date}</span>
                        <span>🏷️ {post.category}</span>
                      </div>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          marginBottom: "1rem",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        marginLeft: "1rem",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          background:
                            post.status === "published"
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(234, 179, 8, 0.2)",
                          border:
                            post.status === "published"
                              ? "1px solid rgba(16, 185, 129, 0.4)"
                              : "1px solid rgba(234, 179, 8, 0.4)",
                          color:
                            post.status === "published" ? "#10b981" : "#eab308",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          textTransform: "uppercase",
                        }}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button
                      onClick={() => {
                        setEditingPost({ ...post });
                        setCurrentPage("edit");
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "rgba(139, 92, 246, 0.2)",
                        border: "1px solid rgba(139, 92, 246, 0.4)",
                        color: "#8b5cf6",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => togglePostStatus(post.id)}
                      style={{
                        padding: "0.5rem 1rem",
                        background:
                          post.status === "published"
                            ? "rgba(234, 179, 8, 0.2)"
                            : "rgba(16, 185, 129, 0.2)",
                        border:
                          post.status === "published"
                            ? "1px solid rgba(234, 179, 8, 0.4)"
                            : "1px solid rgba(16, 185, 129, 0.4)",
                        color:
                          post.status === "published" ? "#eab308" : "#10b981",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                      }}
                    >
                      {post.status === "published"
                        ? "📥 Unpublish"
                        : "🚀 Publish"}
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(post.id)}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "rgba(239, 68, 68, 0.2)",
                        border: "1px solid rgba(239, 68, 68, 0.4)",
                        color: "#ef4444",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === "blog-cms" && currentPage === "create" && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
              }}
            >
              Create New Post
            </h2>

            <div
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                  placeholder="Enter post title..."
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Excerpt
                </label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) =>
                    setNewPost({ ...newPost, excerpt: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                  placeholder="Brief summary of the post..."
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    minHeight: "200px",
                    resize: "vertical",
                  }}
                  placeholder="Write your post content here..."
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8b5cf6",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    value={newPost.author}
                    onChange={(e) =>
                      setNewPost({ ...newPost, author: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                    placeholder="Author name..."
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8b5cf6",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                    placeholder="Category..."
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Status
                </label>
                <select
                  value={newPost.status}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      status: e.target.value as "published" | "draft",
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={createPost}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  📝 Create Post
                </button>
                <button
                  onClick={() => {
                    setNewPost({
                      title: "",
                      excerpt: "",
                      content: "",
                      author: "",
                      category: "",
                      status: "draft",
                    });
                    setCurrentPage("posts");
                  }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                    color: "#8b5cf6",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {type === "blog-cms" && currentPage === "edit" && editingPost && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
              }}
            >
              Edit Post
            </h2>

            <div
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Excerpt
                </label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Content
                </label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    minHeight: "200px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8b5cf6",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, author: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#8b5cf6",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        category: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={updatePost}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setCurrentPage("posts");
                  }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                    color: "#8b5cf6",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === "home" && type === "restaurant" && (
          <div>
            {/* Hero Section */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>�🇹</div>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#ec4899",
                  marginBottom: "1rem",
                }}
              >
                Benvenuti a Bella Vista
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1.2rem",
                  maxWidth: "700px",
                  margin: "0 auto 1rem",
                  lineHeight: "1.6",
                }}
              >
                Experience authentic Italian cuisine crafted with passion,
                tradition, and the finest ingredients. From our family to yours
                since 1985.
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "1rem",
                  fontStyle: "italic",
                }}
              >
                "La cucina italiana è una dichiarazione d'amore" - Italian
                cuisine is a declaration of love
              </p>
            </div>

            {/* About Us Section */}
            <div
              style={{
                background: "rgba(236, 72, 153, 0.1)",
                border: "2px solid rgba(236, 72, 153, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
                marginBottom: "3rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#ec4899",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Our Story
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  marginBottom: "1rem",
                }}
              >
                Founded by Chef Antonio Rossi in the heart of Little Italy,
                Bella Vista brings the warmth and flavors of Tuscany to your
                table. Every dish is prepared using recipes passed down through
                generations, combined with locally-sourced ingredients and
                imported Italian specialties.
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                }}
              >
                Our wood-fired oven, handmade pasta, and commitment to
                excellence have made us a beloved destination for authentic
                Italian dining. Whether you're celebrating a special occasion or
                enjoying a casual meal, we treat every guest like family.
              </p>
            </div>

            {/* Photo Gallery */}
            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Gallery
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "3rem",
              }}
            >
              {[
                { emoji: "🍝", label: "Fresh Pasta" },
                { emoji: "🍕", label: "Wood-Fired Pizza" },
                { emoji: "🥩", label: "Prime Cuts" },
                { emoji: "🍷", label: "Wine Cellar" },
                { emoji: "🏛️", label: "Dining Room" },
                { emoji: "🕯️", label: "Romantic Ambiance" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(236, 72, 153, 0.05)",
                    border: "2px solid rgba(236, 72, 153, 0.2)",
                    borderRadius: "8px",
                    padding: "2rem 1rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ec4899";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(236, 72, 153, 0.2)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>
                    {item.emoji}
                  </div>
                  <div style={{ fontWeight: "600", color: "#ec4899" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Why Choose Bella Vista
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: "👨‍🍳",
                  title: "Master Chefs",
                  desc: "Trained in Italy with 40+ years experience",
                },
                {
                  icon: "🍷",
                  title: "Wine Selection",
                  desc: "300+ Italian wines in our cellar",
                },
                {
                  icon: "🌟",
                  title: "Award Winning",
                  desc: "Michelin recommended since 2010",
                },
                {
                  icon: "🥖",
                  title: "Fresh Daily",
                  desc: "Bread & pasta made fresh every morning",
                },
                {
                  icon: "🎵",
                  title: "Live Music",
                  desc: "Italian classics Friday & Saturday nights",
                },
                {
                  icon: "🎉",
                  title: "Private Events",
                  desc: "Beautiful space for your special occasions",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                    {feature.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#ec4899",
                      marginBottom: "0.5rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    {feature.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.875rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "menu" && type === "restaurant" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              Il Nostro Menu
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "2rem",
              }}
            >
              Our Traditional Italian Menu
            </p>

            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              {["Starters", "Pasta", "Pizza", "Mains", "Desserts"].map(
                (category) => (
                  <div key={category} style={{ marginBottom: "3rem" }}>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#ec4899",
                        marginBottom: "1rem",
                        borderBottom: "2px solid rgba(236, 72, 153, 0.3)",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      {category === "Starters" && "🥗 Antipasti"}
                      {category === "Pasta" && "🍝 Pasta"}
                      {category === "Pizza" && "🍕 Pizza"}
                      {category === "Mains" && "🍖 Secondi Piatti"}
                      {category === "Desserts" && "🍰 Dolci"}
                    </h3>

                    <div style={{ display: "grid", gap: "1rem" }}>
                      {menuItems
                        .filter((item) => item.category === category)
                        .map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: "rgba(236, 72, 153, 0.1)",
                              border: "2px solid rgba(236, 72, 153, 0.3)",
                              borderRadius: "8px",
                              padding: "1.25rem",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "start",
                              gap: "1rem",
                            }}
                          >
                            <div
                              style={{ display: "flex", gap: "1rem", flex: 1 }}
                            >
                              <span
                                style={{ fontSize: "2.5rem", flexShrink: 0 }}
                              >
                                {item.icon}
                              </span>
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    fontWeight: "600",
                                    color: "#fff",
                                    marginBottom: "0.5rem",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  {item.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.9rem",
                                    color: "rgba(255, 255, 255, 0.7)",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  {item.description}
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                color: "#ec4899",
                                flexShrink: 0,
                              }}
                            >
                              {item.price}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {currentPage === "pickup" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              📱 Mobile Pickup Order
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "2rem",
              }}
            >
              Order ahead and pick up at your convenience!
            </p>

            {/* Menu Items with Add to Cart */}
            <div style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
              <h3
                style={{
                  color: "#ec4899",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Select Items
              </h3>
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    marginBottom: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flex: "1 1 200px",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#fff",
                          fontSize: "0.95rem",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {item.category} • {item.price}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      onClick={() => {
                        const qty = cart[item.name] || 0;
                        if (qty > 0) {
                          setCart({ ...cart, [item.name]: qty - 1 });
                        }
                      }}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        background: "rgba(236, 72, 153, 0.2)",
                        border: "1px solid rgba(236, 72, 153, 0.4)",
                        color: "#ec4899",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        color: "#ec4899",
                        fontWeight: "600",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {cart[item.name] || 0}
                    </span>
                    <button
                      onClick={() => {
                        const qty = cart[item.name] || 0;
                        setCart({ ...cart, [item.name]: qty + 1 });
                      }}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        background: "rgba(236, 72, 153, 0.3)",
                        border: "1px solid rgba(236, 72, 153, 0.4)",
                        color: "#ec4899",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pickup Details Form */}
            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                background: "rgba(236, 72, 153, 0.1)",
                border: "2px solid rgba(236, 72, 153, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  color: "#ec4899",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Pickup Details
              </h3>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Phone Number (for SMS notification)
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={pickupPhone}
                  onChange={(e) => setPickupPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Order Summary */}
              {Object.keys(cart).some((k) => cart[k] > 0) && (
                <div
                  style={{
                    marginBottom: "1.5rem",
                    padding: "1rem",
                    background: "rgba(236, 72, 153, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      color: "#ec4899",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Order Summary
                  </div>
                  {Object.entries(cart).map(
                    ([item, qty]) =>
                      qty > 0 && (
                        <div
                          key={item}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span>
                            {item} x{qty}
                          </span>
                        </div>
                      ),
                  )}
                </div>
              )}

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Place Pickup Order
              </button>

              <p
                style={{
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.75rem",
                  marginTop: "1rem",
                  marginBottom: 0,
                }}
              >
                You'll receive an SMS when your order is ready
              </p>
            </div>
          </div>
        )}

        {currentPage === "booking" && type === "restaurant" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              Prenota un Tavolo
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "2rem",
              }}
            >
              Reserve Your Table
            </p>
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                background: "rgba(236, 72, 153, 0.1)",
                border: "2px solid rgba(236, 72, 153, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#ec4899",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(236, 72, 153, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#ec4899",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(236, 72, 153, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#ec4899",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(236, 72, 153, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#ec4899",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Preferred Time
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(236, 72, 153, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                  >
                    <option value="">Select time...</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Number of Guests
                </label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(236, 72, 153, 0.2)",
                      border: "2px solid rgba(236, 72, 153, 0.4)",
                      borderRadius: "8px",
                      color: "#ec4899",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    −
                  </button>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#ec4899",
                      }}
                    >
                      {guests}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {guests === 1 ? "Guest" : "Guests"}
                    </div>
                  </div>
                  <button
                    onClick={() => setGuests(Math.min(20, guests + 1))}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(236, 72, 153, 0.3)",
                      border: "2px solid rgba(236, 72, 153, 0.4)",
                      borderRadius: "8px",
                      color: "#ec4899",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Special Occasion
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  <option value="">None</option>
                  <option value="birthday">Birthday 🎂</option>
                  <option value="anniversary">Anniversary 💕</option>
                  <option value="engagement">Engagement 💍</option>
                  <option value="business">Business Dinner 💼</option>
                </select>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Dietary restrictions, seating preferences, allergies, etc."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "system-ui, sans-serif",
                    resize: "none",
                  }}
                />
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(236, 72, 153, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        {type === "blog-cms"
          ? "© 2025 TechBlog CMS - Content Management Demo"
          : "© 2025 Bella Vista - Restaurant Demo | 📞 (555) 123-4567"}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowDeleteModal(null)}
        >
          <div
            style={{
              background: "#1a1a2e",
              border: "2px solid rgba(239, 68, 68, 0.5)",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "400px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontSize: "3rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              ⚠️
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#ef4444",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Delete Post?
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              This action cannot be undone. Are you sure you want to delete this
              post?
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => {
                  deletePost(showDeleteModal);
                }}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "rgba(139, 92, 246, 0.2)",
                  border: "1px solid rgba(139, 92, 246, 0.4)",
                  color: "#8b5cf6",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
