// NFT Gallery & Minting Demo
"use client";
import React, { useState } from "react";
import { NFTGallery, MintingInterface } from "./nft";

export const NFTDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<"gallery" | "mint">("gallery");

  if (currentView === "mint") {
    return <MintingInterface onBack={() => setCurrentView("gallery")} />;
  }

  return <NFTGallery onMint={() => setCurrentView("mint")} />;
};
