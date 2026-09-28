import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Staking Lab | Web3 Labs",
  description: "Work-in-progress staking experiment in Web3 Labs.",
  path: "/labs/stake",
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
