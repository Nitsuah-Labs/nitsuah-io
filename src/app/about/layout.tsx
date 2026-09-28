import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Developer productivity engineer and researcher: automation, developer experience and Web3, plus the '78 Corvette and '81 Silverado LS swap in the garage.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
