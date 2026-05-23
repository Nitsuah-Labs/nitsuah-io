// Spline About Navigation
"use client";
import { useEffect, useState } from "react";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/kkSOmPWkIvdc1562/scene.splinecode`;

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);

  // Auto-hide loading after 3 seconds minimum to ensure visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Also hide when Spline actually loads (whichever is later)
  const handleLoad = () => {
    setTimeout(() => setIsLoading(false), 2000); // Keep visible for 2 more seconds after load
  };

  return (
    <>
      {isLoading && (
        <div className="spline-loading" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <div className="spline-loading-text">
            Loading interactive scene...
          </div>
        </div>
      )}
      {/* Wrap Spline in canvas div to enable pointer events */}
      <div className="spline-canvas" aria-hidden={isLoading ? "true" : "false"}>
        <div className="spline-loading-text" role="status" aria-live="polite">
          Interactive scene is unavailable in this environment.
        </div>
      </div>
    </>
  );
}

export default SplineScene;
