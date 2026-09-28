import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Lab | Web3 Labs",
  description: "Work-in-progress AI image experiment in Web3 Labs.",
  path: "/labs/ai",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
