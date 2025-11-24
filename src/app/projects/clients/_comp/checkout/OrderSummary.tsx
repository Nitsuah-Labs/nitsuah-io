import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  cart: Record<number, number>;
  products: Product[];
  getCartTotal: () => number;
}

export const OrderSummary: React.FC<Props> = ({
  cart,
  products,
  getCartTotal,
}) => {
  return (
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
          fontWeight: 600,
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
              <div style={{ color: "#fff", fontWeight: 500 }}>
                {product.name} × {qty}
              </div>
            </div>
            <div style={{ color: "#f59e0b", fontWeight: 600 }}>
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
          fontWeight: 700,
          color: "#f59e0b",
        }}
      >
        <span>Total:</span>
        <span>${getCartTotal()}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
