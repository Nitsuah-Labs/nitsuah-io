import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mint Portal | Web3 Labs",
  description: "Mint a Landplot NFT on the Polygon Amoy testnet.",
  path: "/labs/mint",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
