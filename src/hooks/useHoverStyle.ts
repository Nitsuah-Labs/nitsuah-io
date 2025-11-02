import { useState } from "react";

export const useHoverStyle = <T extends Record<string, any>>(
  defaultStyle: T,
  hoverStyle: T,
): [T, { onMouseEnter: () => void; onMouseLeave: () => void }] => {
  const [isHovered, setIsHovered] = useState(false);

  const handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  const style = isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle;

  return [style, handlers];
};
