import React from "react";

interface CheckoutInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
}

interface Props {
  checkoutInfo: CheckoutInfo;
  onUpdateInfo: (info: CheckoutInfo) => void;
}

export const ShippingForm: React.FC<Props> = ({
  checkoutInfo,
  onUpdateInfo,
}) => {
  const commonInput = (
    value: string,
    onChange: (v: string) => void,
    placeholder = "",
  ) => (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "0.75rem",
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(245, 158, 11, 0.3)",
        borderRadius: "6px",
        color: "#fff",
        fontSize: "1rem",
      }}
      placeholder={placeholder}
    />
  );

  return (
    <>
      <h3
        style={{
          color: "#f59e0b",
          marginBottom: "1.5rem",
          fontSize: "1.25rem",
          fontWeight: 600,
        }}
      >
        Shipping Information
      </h3>

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
              color: "#f59e0b",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            Full Name
          </label>
          {commonInput(
            checkoutInfo.name,
            (v) => onUpdateInfo({ ...checkoutInfo, name: v }),
            "John Doe",
          )}
        </div>
        <div>
          <label
            style={{
              display: "block",
              color: "#f59e0b",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={checkoutInfo.email}
            onChange={(e) =>
              onUpdateInfo({ ...checkoutInfo, email: e.target.value })
            }
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: "6px",
              color: "#fff",
            }}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            color: "#f59e0b",
            marginBottom: "0.5rem",
            fontWeight: 500,
          }}
        >
          Address
        </label>
        {commonInput(
          checkoutInfo.address,
          (v) => onUpdateInfo({ ...checkoutInfo, address: v }),
          "123 Main St",
        )}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label
            style={{
              display: "block",
              color: "#f59e0b",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            City
          </label>
          {commonInput(
            checkoutInfo.city,
            (v) => onUpdateInfo({ ...checkoutInfo, city: v }),
            "New York",
          )}
        </div>
        <div>
          <label
            style={{
              display: "block",
              color: "#f59e0b",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            ZIP Code
          </label>
          {commonInput(
            checkoutInfo.zip,
            (v) => onUpdateInfo({ ...checkoutInfo, zip: v }),
            "10001",
          )}
        </div>
      </div>

      <h3
        style={{
          color: "#f59e0b",
          marginBottom: "1.5rem",
          marginTop: "2rem",
          fontSize: "1.25rem",
          fontWeight: 600,
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
            fontWeight: 500,
          }}
        >
          Card Number
        </label>
        <input
          type="text"
          value={checkoutInfo.cardNumber}
          onChange={(e) =>
            onUpdateInfo({ ...checkoutInfo, cardNumber: e.target.value })
          }
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(245,158,11,0.3)",
            borderRadius: "6px",
            color: "#fff",
          }}
          placeholder="**** **** **** 1234"
        />
      </div>
    </>
  );
};

export default ShippingForm;
