import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Token Maker | Web3 Labs",
  description: "Work-in-progress token maker experiment in Web3 Labs.",
  path: "/labs/token",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
