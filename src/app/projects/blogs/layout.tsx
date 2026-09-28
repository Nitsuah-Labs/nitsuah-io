import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Engineering write-ups on AI tooling, CI/CD, monorepos, Next.js upgrades, GitHub organizations and browser games.",
  path: "/projects/blogs",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
