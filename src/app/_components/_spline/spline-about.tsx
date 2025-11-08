// Spline About Navigation
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/kkSOmPWkIvdc1562/scene.splinecode`;

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="spline-loading" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <div className="spline-loading-text">Loading interactive scene...</div>
    </div>
  ),
});

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div
        className="spline-loading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          color: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <p>Interactive 3D scene temporarily unavailable</p>
      </div>
    );
  }

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
        <Spline
          scene={SPLINE_SCENE}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </>
  );
}

export default SplineScene;
