import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Crypto & Web3",
  description:
    "Web3 work and on-chain history: NFTs, POAPs, Coinbase Coinbassador activity and the ideas behind building a user-owned internet.",
  path: "/crypto",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
