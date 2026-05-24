// Spline About Navigation
"use client";
import { useEffect, useRef, useState } from "react";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/kkSOmPWkIvdc1562/scene.splinecode`;

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Defer scene hydration slightly to keep page interactions responsive.
  useEffect(() => {
    let idleId: number | null = null;
    const scheduleRender = () => setShouldRender(true);

    if ((window as Window & { requestIdleCallback?: typeof requestAnimationFrame }).requestIdleCallback) {
      const requestIdleCallback = (window as Window & {
        requestIdleCallback: (
          callback: () => void,
          options?: { timeout: number },
        ) => number;
      }).requestIdleCallback;
      idleId = requestIdleCallback(scheduleRender, { timeout: 1500 });
    } else {
      idleId = window.setTimeout(scheduleRender, 800);
    }

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      const cancelIdleCallback = (window as Window & {
        cancelIdleCallback?: (id: number) => void;
      }).cancelIdleCallback;

      if (cancelIdleCallback && idleId !== null) {
        cancelIdleCallback(idleId);
      } else if (idleId !== null) {
        clearTimeout(idleId);
      }

      clearTimeout(timer);
    };
  }, []);

  // Keep spinner visible briefly after load to avoid flicker.
  const handleLoad = () => {
    setTimeout(() => setIsLoading(false), 2000); // Keep visible for 2 more seconds after load
  };

  useEffect(() => {
    if (!shouldRender || !canvasRef.current) return;

    let cancelled = false;

    const initSpline = async () => {
      try {
        const { Application } = await import("@splinetool/runtime");
        if (cancelled || !canvasRef.current) return;

        const app = new Application(canvasRef.current, { renderMode: "auto" });
        await app.load(SPLINE_SCENE);
        if (!cancelled) handleLoad();
      } catch {
        if (!cancelled) setIsLoading(false);
      }
    };

    initSpline();

    return () => {
      cancelled = true;
    };
  }, [shouldRender]);

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
        {shouldRender ? <canvas ref={canvasRef} aria-label="About page 3D scene" /> : null}
      </div>
    </>
  );
}

export default SplineScene;
