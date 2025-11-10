import React, { CSSProperties, ReactNode } from "react";

interface DemoCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  hover?: boolean;
}

export const DemoCard: React.FC<DemoCardProps> = ({
  children,
  className = "",
  style = {},
  onClick,
  hover = true,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const defaultStyle: CSSProperties = {
    background: "rgba(20, 20, 20, 0.8)",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "1.5rem",
    transition: "all 0.3s ease",
    cursor: onClick ? "pointer" : "default",
    transform: hover && isHovered ? "translateY(-4px)" : "none",
    boxShadow: hover && isHovered ? "0 8px 24px rgba(0, 0, 0, 0.3)" : "none",
    ...style,
  };

  return (
    <div
      className={className}
      style={defaultStyle}
      onClick={onClick}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
    >
      {children}
    </div>
  );
};
