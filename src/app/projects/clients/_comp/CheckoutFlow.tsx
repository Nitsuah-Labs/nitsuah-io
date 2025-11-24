import React from "react";

interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
}

interface CheckoutFlowProps {
  currentPage: "checkout" | "confirmation";
  checkoutInfo: CheckoutInfo;
  cart: Record<number, number>;
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  }>;
  orderNumber: string;
  onUpdateInfo: (info: CheckoutInfo) => void;
  onCompleteOrder: () => void;
  onBackToCart: () => void;
  onContinueShopping: () => void;
}

import OrderSummary from "./checkout/OrderSummary";
import ShippingForm from "./checkout/ShippingForm";

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  currentPage,
  checkoutInfo,
  cart,
  products,
  orderNumber,
  onUpdateInfo,
  onCompleteOrder,
  onBackToCart,
  onContinueShopping,
}) => {
  const getCartTotal = () => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  if (currentPage === "checkout") {
    return (
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <button
          onClick={onBackToCart}
          style={{
            marginBottom: "1.5rem",
            padding: "0.75rem 1.5rem",
            background: "rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            borderRadius: "8px",
            color: "#f59e0b",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          ← Back to Cart
        </button>

        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#f59e0b",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Checkout
        </h2>

        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "2px solid rgba(245,158,11,0.3)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <ShippingForm
            checkoutInfo={checkoutInfo}
            onUpdateInfo={onUpdateInfo}
          />
        </div>

        <OrderSummary
          cart={cart}
          products={products}
          getCartTotal={getCartTotal}
        />

        <button
          onClick={onCompleteOrder}
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
  }

  // Confirmation page
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
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
        onClick={onContinueShopping}
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
  );
};
