import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Lookup Lab | Web3 Labs",
  description: "Work-in-progress on-chain lookup experiment in Web3 Labs.",
  path: "/labs/lookup",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
