/**
 * NFTGallery.tsx
 *
 * TODO: Extract from NFTDemo.tsx (524 LOC)
 *
 * This will handle the NFT gallery view showing:
 * - NFT collection grid with images/icons
 * - NFT details (name, price, creator address)
 * - Wallet connection status
 * - Buy/bid buttons
 * - Filter by price, creator
 *
 * Target: ~200 LOC
 *
 * Can use shared components:
 * - DemoCard for NFT cards
 * - DemoButton for buy/bid actions
 * - DemoSection for filters
 *
 * Lines to extract from NFTDemo: ~275-440
 */

"use client";
import React from "react";

export const NFTGallery: React.FC = () => {
  return (
    <div>
      <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
        NFT Gallery - To be extracted from NFTDemo
      </p>
    </div>
  );
};
