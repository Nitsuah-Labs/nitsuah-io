import React, { CSSProperties, ReactNode } from "react";
import styles from "./DemoButton.module.css";

interface DemoButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const DemoButton: React.FC<DemoButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  style = {},
  className = "",
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      style={style}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
