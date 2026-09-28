import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Registration Portal | Web3 Labs",
  description: "Sign up for Web3 experiments on the Polygon Amoy testnet.",
  path: "/labs/register",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
