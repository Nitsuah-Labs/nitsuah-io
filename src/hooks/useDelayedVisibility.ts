import { useEffect, useState } from "react";

export const useDelayedVisibility = (delay: number = 1000): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};
