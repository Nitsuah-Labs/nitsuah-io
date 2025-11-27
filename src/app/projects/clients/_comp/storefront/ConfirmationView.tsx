// Confirmation View Component for Storefront Demo
import React from "react";

interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
}

interface ConfirmationViewProps {
  orderNumber: string;
  checkoutInfo: CheckoutInfo;
  onContinueShopping: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  orderNumber,
  checkoutInfo,
  onContinueShopping,
}) => {
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
