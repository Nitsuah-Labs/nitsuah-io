import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sub-domain Portal | Web3 Labs",
  description: "Register a sub-domain on the Polygon Amoy testnet.",
  path: "/labs/domains",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
