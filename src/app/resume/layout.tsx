import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of Austin J. Hardy: senior systems and platform engineer at Netflix, Coinbase and Blackboard \u2014 Atlassian platforms, integrations, automation and AI tooling.",
  path: "/resume",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
