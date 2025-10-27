// Spline Home Navigation
"use client";
import Spline from "@splinetool/react-spline";

// Set the scene URL
const SPLINE_SCENE = `https://prod.spline.design/kkSOmPWkIvdc1562/scene.splinecode`;

export function SplineScene() {
  return <Spline scene={SPLINE_SCENE} />;
}
export default SplineScene;
