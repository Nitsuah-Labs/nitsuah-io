import React, { CSSProperties, ReactNode } from "react";

interface DemoHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  actions?: ReactNode;
  style?: CSSProperties;
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  title,
  subtitle,
  icon,
  actions,
  style = {},
}) => {
  return (
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "1rem",
        ...style,
      }}
    >
      <div style={{ flex: 1, minWidth: "200px" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#fff",
            marginBottom: subtitle ? "0.5rem" : "0",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {icon && <span style={{ fontSize: "2rem" }}>{icon}</span>}
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.7)",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", gap: "0.75rem" }}>{actions}</div>
      )}
    </div>
  );
};
