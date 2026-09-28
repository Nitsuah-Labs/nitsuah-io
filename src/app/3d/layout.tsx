import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "3D Experience",
  description:
    "Interactive Spline 3D scene, moved off the home page to keep the landing page fast.",
  path: "/3d",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
