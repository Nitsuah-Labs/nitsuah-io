// Spline About Navigation
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/kkSOmPWkIvdc1562/scene.splinecode`;

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);

  // Auto-hide loading after 10 seconds regardless of actual load state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
        <Spline scene={SPLINE_SCENE} onLoad={() => setIsLoading(false)} />
      </div>
    </>
  );
}

export default SplineScene;
