import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Web3 Labs",
  description:
    "Testnet Web3 experiments on Polygon Amoy: mint NFTs, register sub-domains and try wallet flows with free test MATIC.",
  path: "/labs",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
