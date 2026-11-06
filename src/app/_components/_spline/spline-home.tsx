// Spline Home Navigation
"use client";
import { useEffect, useRef, useState } from "react";

// Public scene URL (no API key needed)
const SPLINE_SCENE = `https://prod.spline.design/I53VLJ6OCdGVN8lr/scene.splinecode`;

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const [failed, setFailed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Mount the Spline runtime on the canvas once the browser is idle
  useEffect(() => {
    if (!shouldRender || !canvasRef.current) return;

    let cancelled = false;

    const initSpline = async () => {
      try {
        const { Application } = await import("@splinetool/runtime");
        if (cancelled || !canvasRef.current) return;
        const app = new Application(canvasRef.current, { renderMode: "auto" });
        await app.load(SPLINE_SCENE);
        if (!cancelled) setIsLoading(false);
      } catch {
        if (!cancelled) {
          setFailed(true);
          setIsLoading(false);
        }
      }
    };

    initSpline();

    return () => {
      cancelled = true;
    };
  }, [shouldRender]);

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

      {/* The Spline runtime draws into this canvas; CSS forces it to fill the wrapper */}
      <div className="spline-canvas" aria-hidden={isLoading ? "true" : "false"}>
        {shouldRender && !failed ? (
          <canvas ref={canvasRef} aria-label="Interactive 3D scene" />
        ) : null}
        {failed ? (
          <div className="spline-loading-text" role="status" aria-live="polite">
            Interactive scene could not be loaded.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SplineScene;
