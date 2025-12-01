import React, { CSSProperties, ReactNode } from "react";
import styles from "./DemoCard.module.css";

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
  const cardClasses = [
    styles.card,
    onClick && styles.clickable,
    hover && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} style={style} onClick={onClick}>
      {children}
    </div>
  );
};
