// Spline Home Navigation
"use client";
import dynamic from "next/dynamic";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/I53VLJ6OCdGVN8lr/scene.splinecode`;

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export function SplineScene() {
  // Render the dynamic Spline component client-side only
  return <Spline scene={SPLINE_SCENE} />;
}

export default SplineScene;
