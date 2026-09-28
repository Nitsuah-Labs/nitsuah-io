import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Client Projects",
  description:
    "Client website demos: restaurant, e-commerce, real estate, CMS and NFT marketplace builds.",
  path: "/projects/clients",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
