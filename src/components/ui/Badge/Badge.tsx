import React from "react";
import styles from "./Badge.module.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const classNames = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
};
