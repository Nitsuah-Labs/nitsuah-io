// Checkout View Component for Storefront Demo
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
}

interface Cart {
  [key: string]: number;
}

interface CheckoutViewProps {
  cart: Cart;
  products: Product[];
  checkoutInfo: CheckoutInfo;
  onCheckoutInfoChange: (info: CheckoutInfo) => void;
  onBack: () => void;
  onComplete: () => void;
  calculateTotal: (cart: Cart, products: Product[]) => number;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  products,
  checkoutInfo,
  onCheckoutInfoChange,
  onBack,
  onComplete,
  calculateTotal,
}) => {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <button
        onClick={onBack}
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
                onCheckoutInfoChange({ ...checkoutInfo, name: e.target.value })
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
                onCheckoutInfoChange({
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
                onCheckoutInfoChange({
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
                onCheckoutInfoChange({ ...checkoutInfo, city: e.target.value })
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
                onCheckoutInfoChange({ ...checkoutInfo, zip: e.target.value })
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
              onCheckoutInfoChange({
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
          <span>${calculateTotal(cart, products)}</span>
        </div>
      </div>

      <button
        onClick={onComplete}
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
  );
};
