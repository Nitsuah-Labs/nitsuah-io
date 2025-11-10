import React, { CSSProperties, ReactNode } from "react";

interface DemoSectionProps {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  style?: CSSProperties;
  headerStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

export const DemoSection: React.FC<DemoSectionProps> = ({
  title,
  children,
  collapsible = false,
  defaultExpanded = true,
  style = {},
  headerStyle = {},
  contentStyle = {},
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div
      style={{
        marginBottom: "1.5rem",
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            cursor: collapsible ? "pointer" : "default",
            ...headerStyle,
          }}
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#fff",
              margin: 0,
            }}
          >
            {title}
          </h3>
          {collapsible && (
            <span
              style={{
                fontSize: "1.5rem",
                color: "rgba(255, 255, 255, 0.6)",
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▼
            </span>
          )}
        </div>
      )}
      {(!collapsible || isExpanded) && (
        <div style={{ ...contentStyle }}>{children}</div>
      )}
    </div>
  );
};
