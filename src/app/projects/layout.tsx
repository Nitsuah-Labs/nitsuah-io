import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected projects by Austin J. Hardy: AI agent orchestration, repository intelligence, cryptanalysis research, Web3 apps and 3D browser games.",
  path: "/projects",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
