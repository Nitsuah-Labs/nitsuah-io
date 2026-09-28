import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "DAO Lab | Web3 Labs",
  description: "Work-in-progress DAO experiment in Web3 Labs.",
  path: "/labs/dao",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
