// Spline Home Navigation
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/I53VLJ6OCdGVN8lr/scene.splinecode`;

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
    // Use the page-level spline container so the scene can sit behind header/footer
    <div
      className="spline-container"
      role="region"
      aria-label="Interactive 3D scene"
      data-testid="spline-container"
    >
      {isLoading && (
        <div className="spline-loading" aria-live="polite">
          <div className="spinner" aria-hidden="true"></div>
          <div className="spline-loading-text">
            Loading interactive scene...
          </div>
        </div>
      )}

      {/* The Spline runtime injects a canvas; wrap it so we can force sizing via CSS */}
      <div className="spline-canvas" aria-hidden={isLoading ? "true" : "false"}>
        <Spline scene={SPLINE_SCENE} onLoad={() => setIsLoading(false)} />
      </div>
    </div>
  );
}

export default SplineScene;
