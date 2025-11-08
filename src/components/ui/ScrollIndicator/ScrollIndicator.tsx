import React from "react";
import styles from "./ScrollIndicator.module.css";

interface ScrollIndicatorProps {
  isVisible: boolean;
  text?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  isVisible,
  text = "Scroll for more",
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.container}>
      <div className={styles.text}>{text}</div>
      <div className={styles.mouse}>
        <div className={styles.wheel} />
      </div>
    </div>
  );
};
