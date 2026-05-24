// Spline Home Navigation
"use client";
import { useEffect, useState } from "react";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/I53VLJ6OCdGVN8lr/scene.splinecode`;

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  // Auto-hide loading after 10 seconds regardless of actual load state
  useEffect(() => {
    // Defer heavy Spline rendering until the browser is idle to improve LCP/TBT
    let idleId: any = null;
    const idleCallback = () => setShouldRender(true);

    if ((window as any).requestIdleCallback) {
      idleId = (window as any).requestIdleCallback(idleCallback, {
        timeout: 2000,
      });
    } else {
      // Fallback: small timeout to avoid blocking initial paint
      idleId = window.setTimeout(idleCallback, 1000);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      if ((window as any).cancelIdleCallback && idleId) {
        (window as any).cancelIdleCallback(idleId);
      } else if (idleId) {
        clearTimeout(idleId as number);
      }
      clearTimeout(timer);
    };
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
        {shouldRender ? (
          <div className="spline-loading-text" role="status" aria-live="polite">
            Interactive scene is unavailable in this environment.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SplineScene;
