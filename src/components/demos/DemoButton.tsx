import React, { CSSProperties, ReactNode } from "react";

interface DemoButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const variantStyles = {
  primary: {
    background: "#3b82f6",
    color: "#fff",
    border: "2px solid #3b82f6",
    hover: { background: "#2563eb", borderColor: "#2563eb" },
  },
  secondary: {
    background: "#6b7280",
    color: "#fff",
    border: "2px solid #6b7280",
    hover: { background: "#4b5563", borderColor: "#4b5563" },
  },
  success: {
    background: "#22c55e",
    color: "#fff",
    border: "2px solid #22c55e",
    hover: { background: "#16a34a", borderColor: "#16a34a" },
  },
  danger: {
    background: "#ef4444",
    color: "#fff",
    border: "2px solid #ef4444",
    hover: { background: "#dc2626", borderColor: "#dc2626" },
  },
  ghost: {
    background: "transparent",
    color: "rgba(255, 255, 255, 0.8)",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    hover: {
      background: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
  },
};

const sizeStyles = {
  small: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
  medium: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
  large: { padding: "1rem 2rem", fontSize: "1.125rem" },
};

export const DemoButton: React.FC<DemoButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  style = {},
  className = "",
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const buttonStyle: CSSProperties = {
    ...sizeStyle,
    background:
      isHovered && !disabled
        ? variantStyle.hover.background
        : variantStyle.background,
    color: disabled ? "rgba(255, 255, 255, 0.3)" : variantStyle.color,
    border:
      isHovered && !disabled
        ? `2px solid ${variantStyle.hover.borderColor}`
        : variantStyle.border,
    borderRadius: "8px",
    fontWeight: "600",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    ...style,
  };

  return (
    <button
      className={className}
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      {children}
    </button>
  );
};
