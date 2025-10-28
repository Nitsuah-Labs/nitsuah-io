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
        <div className="spline-loading">
          <div className="spinner"></div>
          <div className="spline-loading-text">
            Loading interactive scene...
          </div>
        </div>
      )}
      <Spline scene={SPLINE_SCENE} onLoad={() => setIsLoading(false)} />
    </>
  );
}

export default SplineScene;
