"use client";
import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE = `https://prod.spline.design/kkSOmPWkIvdc1562/scene.splinecode`;

export function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let idleId: number | null = null;
    const scheduleRender = () => setShouldRender(true);

    const win = window as unknown as Record<string, unknown>;
    if (typeof win["requestIdleCallback"] === "function") {
      const ric = win["requestIdleCallback"] as (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      idleId = ric(scheduleRender, { timeout: 1500 });
    } else {
      idleId = window.setTimeout(scheduleRender, 800);
    }

    const timer = window.setTimeout(() => setIsLoading(false), 10000);

    return () => {
      const cic = (window as unknown as Record<string, unknown>)[
        "cancelIdleCallback"
      ];
      if (typeof cic === "function" && idleId !== null) {
        (cic as (id: number) => void)(idleId);
      } else if (idleId !== null) {
        clearTimeout(idleId);
      }
      clearTimeout(timer);
    };
  }, []);

  const handleLoad = () => {
    setTimeout(() => setIsLoading(false), 2000);
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
      <div className="spline-canvas" aria-hidden={isLoading ? "true" : "false"}>
        {shouldRender ? (
          <canvas ref={canvasRef} aria-label="About page 3D scene" />
        ) : null}
      </div>
    </>
  );
}

export default SplineScene;
