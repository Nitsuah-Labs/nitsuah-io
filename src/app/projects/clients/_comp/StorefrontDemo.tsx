// Enhanced E-Commerce Storefront Demo
"use client";
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  img: string;
  category: string;
  description: string;
  inStock: number;
  isOnSale?: boolean;
  isFeatured?: boolean;
}

interface Bundle {
  id: string;
  name: string;
  products: number[];
  price: number;
  savings: number;
  img: string;
}

interface CartItem {
  productId: number;
  quantity: number;
}

interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
}

export const StorefrontDemo: React.FC = () => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "cart"
    | "product"
    | "upload"
    | "bundle"
    | "checkout"
    | "confirmation"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
  });
  const [orderNumber, setOrderNumber] = useState<string>("");

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 299,
      img: "🎧",
      category: "Audio",
      description:
        "Noise-canceling over-ear headphones with 30-hour battery life",
      inStock: 15,
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 339,
      originalPrice: 399,
      img: "⌚",
      category: "Wearables",
      description: "Fitness tracking, heart rate monitor, GPS, water resistant",
      inStock: 8,
      isOnSale: true,
      isFeatured: true,
    },
    {
      id: 3,
      name: "Laptop Pro 15",
      price: 1299,
      img: "💻",
      category: "Computers",
      description: "16GB RAM, 512GB SSD, Intel i7, 15.6-inch display",
      inStock: 5,
      isFeatured: true,
    },
    {
      id: 4,
      name: "Camera Kit",
      price: 899,
      img: "📷",
      category: "Photography",
      description: "24MP, 4K video, includes 2 lenses and carrying case",
      inStock: 12,
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      price: 149,
      img: "🎵",
      category: "Audio",
      description: "Active noise cancellation, 8-hour battery, touch controls",
      inStock: 25,
    },
    {
      id: 6,
      name: "Gaming Mouse",
      price: 79,
      originalPrice: 99,
      img: "🖱️",
      category: "Accessories",
      description: "16000 DPI, RGB lighting, programmable buttons",
      inStock: 30,
      isOnSale: true,
    },
  ];

  const bundles: Bundle[] = [
    {
      id: "bundle-1",
      name: "Work From Home Setup",
      products: [1, 3, 6],
      price: 1599,
      savings: 78,
      img: "💼",
    },
    {
      id: "bundle-2",
      name: "Fitness Enthusiast Pack",
      products: [2, 5],
      price: 449,
      savings: 39,
      img: "🏃",
    },
  ];

  const addToCart = (productId: number) => {
    setCart({ ...cart, [productId]: (cart[productId] || 0) + 1 });
  };

  const addBundleToCart = (bundleId: string) => {
    const bundle = bundles.find((b) => b.id === bundleId);
    if (!bundle) return;

    const newCart = { ...cart };
    bundle.products.forEach((productId) => {
      newCart[productId] = (newCart[productId] || 0) + 1;
    });
    setCart(newCart);
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [productId]: quantity });
    }
  };

  const clearCart = () => {
    setCart({});
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return sum + (product?.price || 0) * qty;
    }, 0);
  };

  const viewProduct = (productId: number) => {
    setSelectedProduct(productId);
    setCurrentPage("product");
  };

  const viewBundle = (bundleId: string) => {
    setSelectedBundle(bundleId);
    setCurrentPage("bundle");
  };

  const proceedToCheckout = () => {
    setCurrentPage("checkout");
  };

  const completeOrder = () => {
    const orderNum = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setCurrentPage("confirmation");
    clearCart();
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .store-nav {
            flex-direction: column;
            align-items: stretch !important;
          }
          
          .store-nav-buttons {
            width: 100%;
            justify-content: space-around;
          }
          
          .store-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .store-bundle-grid {
            grid-template-columns: 1fr !important;
          }
          
          .store-cart-items {
            padding: 1rem !important;
          }
          
          .store-form-grid {
            grid-template-columns: 1fr !important;
          }
          
          .store-product-detail {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          .store-product-grid {
            grid-template-columns: 1fr !important;
          }
          
          .store-nav button {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem !important;
          }
          
          .store-cart-items {
            padding: 0.75rem !important;
          }
          
          .store-product-card {
            padding: 1rem !important;
          }
        }
      `}</style>
      {/* Navigation Bar */}
      <nav
        className="store-nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderRadius: "8px 8px 0 0",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div
          className="store-nav-buttons"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff" }}
          >
            🛒 ShopNow
          </span>
          <button
            onClick={() => {
              setCurrentPage("home");
              setSelectedProduct(null);
            }}
            style={{
              background:
                currentPage === "home"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("upload")}
            style={{
              background:
                currentPage === "upload"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            + Sell Item
          </button>
        </div>
        <button
          onClick={() => setCurrentPage("cart")}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            border: "2px solid #fff",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            position: "relative",
            fontSize: "0.875rem",
          }}
        >
          Cart ({getTotalItems()})
        </button>
      </nav>

      {/* Page Content */}
      <div style={{ padding: "1.5rem", minHeight: "400px" }}>
        {currentPage === "home" && (
          <div>
            <div
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  margin: "0 0 0.5rem 0",
                }}
              >
                🔥 Limited Time Deals
              </h3>
              <p style={{ color: "rgba(255,255,255,0.9)", margin: 0 }}>
                Save up to 15% on select items!
              </p>
            </div>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "1rem",
              }}
            >
              💎 Exclusive Bundles
            </h2>
            <div
              className="store-bundle-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {bundles.map((bundle) => (
                <div
                  key={bundle.id}
                  onClick={() => viewBundle(bundle.id)}
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f59e0b";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245, 158, 11, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "3rem", textAlign: "center" }}>
                    {bundle.img}
                  </div>
                  <h3
                    style={{
                      fontWeight: "600",
                      color: "#f59e0b",
                      margin: "0.5rem 0",
                    }}
                  >
                    {bundle.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ color: "#fff", fontWeight: "700" }}>
                        ${bundle.price}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#10b981" }}>
                        Save ${bundle.savings}!
                      </div>
                    </div>
                    <span
                      style={{
                        background: "#10b981",
                        color: "#fff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      {bundle.products.length} items
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "1rem",
              }}
            >
              All Products
            </h2>
            <div
              className="store-product-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="store-product-card"
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "8px",
                    padding: "1rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative",
                  }}
                  onClick={() => viewProduct(product.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f59e0b";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245, 158, 11, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {product.isOnSale && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        background: "#dc2626",
                        color: "#fff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.7rem",
                        fontWeight: "700",
                      }}
                    >
                      SALE
                    </div>
                  )}
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    {product.img}
                  </div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#f59e0b",
                      marginBottom: "0.25rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {product.name}
                  </div>
                  <div>
                    {product.originalPrice && (
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "rgba(255, 255, 255, 0.4)",
                          fontSize: "0.875rem",
                          marginRight: "0.5rem",
                        }}
                      >
                        ${product.originalPrice}
                      </span>
                    )}
                    <span
                      style={{
                        color: product.isOnSale ? "#dc2626" : "#fff",
                        fontSize: "1.1rem",
                        fontWeight: "700",
                      }}
                    >
                      ${product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "product" && selectedProduct !== null && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {(() => {
              const product = products.find((p) => p.id === selectedProduct);
              if (!product) return null;

              return (
                <>
                  <button
                    onClick={() => setCurrentPage("home")}
                    style={{
                      background: "rgba(245, 158, 11, 0.2)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      color: "#f59e0b",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginBottom: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    ← Back to Shop
                  </button>

                  <div
                    className="store-product-detail"
                    style={{
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "2px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "12px",
                      padding: "2rem",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "2rem",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "8rem" }}>{product.img}</div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255, 255, 255, 0.6)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {product.category}
                      </div>
                      <h2
                        style={{
                          fontSize: "2rem",
                          fontWeight: "700",
                          color: "#f59e0b",
                          margin: "0 0 1rem 0",
                        }}
                      >
                        {product.name}
                      </h2>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {product.description}
                      </p>

                      <div style={{ marginBottom: "1.5rem" }}>
                        {product.originalPrice && (
                          <div style={{ marginBottom: "0.5rem" }}>
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "rgba(255, 255, 255, 0.4)",
                                fontSize: "1.25rem",
                                marginRight: "1rem",
                              }}
                            >
                              ${product.originalPrice}
                            </span>
                            <span
                              style={{
                                background: "#10b981",
                                color: "#fff",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "4px",
                                fontSize: "0.875rem",
                                fontWeight: "600",
                              }}
                            >
                              Save ${product.originalPrice - product.price}
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            color: product.isOnSale ? "#dc2626" : "#f59e0b",
                          }}
                        >
                          ${product.price}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product.id)}
                        style={{
                          width: "100%",
                          padding: "1rem",
                          background:
                            "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                          border: "none",
                          color: "#fff",
                          borderRadius: "8px",
                          fontSize: "1.1rem",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {currentPage === "cart" && (
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "1.5rem",
              }}
            >
              Shopping Cart
            </h2>

            {getTotalItems() === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
                <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Your cart is empty
                </p>
                <button
                  onClick={() => setCurrentPage("home")}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "1rem",
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {Object.entries(cart).map(([id, qty]) => {
                  const product = products.find((p) => p.id === Number(id));
                  if (!product || qty === 0) return null;

                  return (
                    <div
                      key={id}
                      className="store-cart-items"
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        border: "2px solid rgba(245, 158, 11, 0.3)",
                        borderRadius: "8px",
                        padding: "1rem",
                        marginBottom: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div style={{ fontSize: "2rem" }}>{product.img}</div>
                        <div>
                          <div style={{ fontWeight: "600", color: "#f59e0b" }}>
                            {product.name}
                          </div>
                          <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            ${product.price} each
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <button
                            onClick={() => {
                              if (qty > 1) {
                                setCart({ ...cart, [id]: qty - 1 });
                              } else {
                                const newCart = { ...cart };
                                delete newCart[Number(id)];
                                setCart(newCart);
                              }
                            }}
                            style={{
                              width: "32px",
                              height: "32px",
                              background: "rgba(245, 158, 11, 0.2)",
                              border: "1px solid rgba(245, 158, 11, 0.4)",
                              color: "#f59e0b",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "700",
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              color: "#fff",
                              fontWeight: "600",
                              minWidth: "20px",
                              textAlign: "center",
                            }}
                          >
                            {qty}
                          </span>
                          <button
                            onClick={() => setCart({ ...cart, [id]: qty + 1 })}
                            style={{
                              width: "32px",
                              height: "32px",
                              background: "rgba(245, 158, 11, 0.3)",
                              border: "1px solid rgba(245, 158, 11, 0.4)",
                              color: "#f59e0b",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "700",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div
                          style={{
                            fontWeight: "700",
                            color: "#f59e0b",
                            fontSize: "1.25rem",
                            minWidth: "80px",
                            textAlign: "right",
                          }}
                        >
                          ${product.price * qty}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1.5rem",
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "#f59e0b",
                    }}
                  >
                    <span>Total:</span>
                    <span>${getCartTotal()}</span>
                  </div>
                  <button
                    onClick={proceedToCheckout}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      border: "none",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {currentPage === "bundle" && selectedBundle && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {(() => {
              const bundle = bundles.find((b) => b.id === selectedBundle);
              if (!bundle) return null;

              const bundleProducts = products.filter((p) =>
                bundle.products.includes(p.id),
              );

              return (
                <>
                  <button
                    onClick={() => setCurrentPage("home")}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(245, 158, 11, 0.2)",
                      border: "1px solid rgba(245, 158, 11, 0.4)",
                      color: "#f59e0b",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginBottom: "1.5rem",
                      fontWeight: "600",
                    }}
                  >
                    ← Back to Store
                  </button>

                  <div
                    style={{
                      background: "rgba(245, 158, 11, 0.1)",
                      border: "2px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "12px",
                      padding: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "4rem",
                        textAlign: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      {bundle.img}
                    </div>
                    <h2
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#f59e0b",
                        marginBottom: "1rem",
                        textAlign: "center",
                      }}
                    >
                      {bundle.name}
                    </h2>

                    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                      <div
                        style={{
                          fontSize: "2rem",
                          fontWeight: "700",
                          color: "#f59e0b",
                          marginBottom: "0.5rem",
                        }}
                      >
                        ${bundle.price}
                      </div>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          color: "#10b981",
                          fontWeight: "600",
                        }}
                      >
                        💰 Save ${bundle.savings}!
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "rgba(255, 255, 255, 0.6)",
                          marginTop: "0.5rem",
                        }}
                      >
                        Bundle includes {bundle.products.length} premium items
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addBundleToCart(bundle.id);
                        setCurrentPage("cart");
                      }}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        background:
                          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                        border: "none",
                        color: "#fff",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      🛒 Add Bundle to Cart
                    </button>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#f59e0b",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Included Products
                  </h3>

                  <div style={{ display: "grid", gap: "1rem" }}>
                    {bundleProducts.map((product) => (
                      <div
                        key={product.id}
                        style={{
                          background: "rgba(245, 158, 11, 0.05)",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                          borderRadius: "8px",
                          padding: "1.5rem",
                          display: "flex",
                          gap: "1.5rem",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ fontSize: "3rem", flexShrink: 0 }}>
                          {product.img}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              fontWeight: "600",
                              color: "#f59e0b",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {product.name}
                          </h4>
                          <p
                            style={{
                              color: "rgba(255, 255, 255, 0.7)",
                              fontSize: "0.9rem",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {product.description}
                          </p>
                          <div
                            style={{
                              color: "rgba(255, 255, 255, 0.5)",
                              fontSize: "0.85rem",
                            }}
                          >
                            Category: {product.category}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div
                            style={{
                              fontWeight: "700",
                              color: "#f59e0b",
                              fontSize: "1.25rem",
                            }}
                          >
                            ${product.price}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "#10b981",
                              marginTop: "0.25rem",
                            }}
                          >
                            ✓ In Stock
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {currentPage === "checkout" && (
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <button
              onClick={() => setCurrentPage("cart")}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(245, 158, 11, 0.2)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                color: "#f59e0b",
                borderRadius: "6px",
                cursor: "pointer",
                marginBottom: "1.5rem",
                fontWeight: "600",
              }}
            >
              ← Back to Cart
            </button>

            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "1.5rem",
              }}
            >
              Checkout
            </h2>

            <div
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "2px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  color: "#f59e0b",
                  marginBottom: "1.5rem",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                Shipping Information
              </h3>
              <div
                className="store-form-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#f59e0b",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={checkoutInfo.name}
                    onChange={(e) =>
                      setCheckoutInfo({ ...checkoutInfo, name: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                    placeholder="John Doe"
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#f59e0b",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={checkoutInfo.email}
                    onChange={(e) =>
                      setCheckoutInfo({
                        ...checkoutInfo,
                        email: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                    placeholder="john@example.com"
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      color: "#f59e0b",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={checkoutInfo.address}
                    onChange={(e) =>
                      setCheckoutInfo({
                        ...checkoutInfo,
                        address: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#f59e0b",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    value={checkoutInfo.city}
                    onChange={(e) =>
                      setCheckoutInfo({ ...checkoutInfo, city: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#f59e0b",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={checkoutInfo.zip}
                    onChange={(e) =>
                      setCheckoutInfo({ ...checkoutInfo, zip: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "1rem",
                    }}
                    placeholder="10001"
                  />
                </div>
              </div>

              <h3
                style={{
                  color: "#f59e0b",
                  marginBottom: "1.5rem",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                Payment Information
              </h3>
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#f59e0b",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                  }}
                >
                  Card Number
                </label>
                <input
                  type="text"
                  value={checkoutInfo.cardNumber}
                  onChange={(e) =>
                    setCheckoutInfo({
                      ...checkoutInfo,
                      cardNumber: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                  placeholder="**** **** **** 1234"
                />
              </div>
            </div>

            <div
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "2px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  color: "#f59e0b",
                  marginBottom: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                }}
              >
                Order Summary
              </h3>

              {Object.entries(cart).map(([id, qty]) => {
                const product = products.find((p) => p.id === Number(id));
                if (!product || qty === 0) return null;

                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
                    }}
                  >
                    <div>
                      <div style={{ color: "#fff", fontWeight: "500" }}>
                        {product.name} × {qty}
                      </div>
                    </div>
                    <div style={{ color: "#f59e0b", fontWeight: "600" }}>
                      ${product.price * qty}
                    </div>
                  </div>
                );
              })}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "2px solid rgba(245, 158, 11, 0.3)",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#f59e0b",
                }}
              >
                <span>Total:</span>
                <span>${getCartTotal()}</span>
              </div>
            </div>

            <button
              onClick={completeOrder}
              style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                border: "none",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Complete Purchase
            </button>
          </div>
        )}

        {currentPage === "confirmation" && (
          <div
            style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
          >
            <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>✅</div>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#10b981",
                marginBottom: "1rem",
              }}
            >
              Order Confirmed!
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "2rem",
              }}
            >
              Thank you for your purchase!
            </p>

            <div
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "2px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Order Number
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {orderNumber}
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Delivery Address
                </div>
                <div style={{ color: "#fff" }}>
                  {checkoutInfo.name}
                  <br />
                  {checkoutInfo.address}
                  <br />
                  {checkoutInfo.city}, {checkoutInfo.zip}
                </div>
              </div>

              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                <div
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "0.9rem",
                  }}
                >
                  📧 Confirmation email sent to: {checkoutInfo.email}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentPage("home");
                setCheckoutInfo({
                  name: "",
                  email: "",
                  address: "",
                  city: "",
                  zip: "",
                  cardNumber: "",
                });
              }}
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                border: "none",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {currentPage === "upload" && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              List a New Item
            </h2>
            <div
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "2px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#f59e0b",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Wireless Keyboard"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
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
                    color: "#f59e0b",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Category
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  <option>Audio</option>
                  <option>Wearables</option>
                  <option>Computers</option>
                  <option>Photography</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div
                className="store-form-grid"
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
                      color: "#f59e0b",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(245, 158, 11, 0.3)",
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
                      color: "#f59e0b",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(245, 158, 11, 0.3)",
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
                    color: "#f59e0b",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your product..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "system-ui, sans-serif",
                    resize: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#f59e0b",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Images
                </label>
                <div
                  style={{
                    border: "2px dashed rgba(245, 158, 11, 0.3)",
                    borderRadius: "8px",
                    padding: "2rem",
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.6)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                    📁
                  </div>
                  <p>Click to upload or drag and drop</p>
                  <p style={{ fontSize: "0.875rem" }}>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                List Item for Sale
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(245, 158, 11, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 ShopNow - E-Commerce Demo
      </div>
    </div>
  );
};
