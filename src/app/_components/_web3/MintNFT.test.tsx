import React from "react";
import { render, screen } from "@testing-library/react";
import { MintNFT } from "./MintNFT";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the wagmi config and client
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </WagmiProvider>
  );
};

describe("MintNFT Component", () => {
  it("renders the minting section", () => {
    renderWithProviders(<MintNFT />);

    // Check if the "Mint NFT" button is present
    const mintButton = screen.getByRole("button", { name: /Mint NFT/i });
    expect(mintButton).toBeInTheDocument();

    // Check for the title
    const title = screen.getByText(/Mint an NFT/i);
    expect(title).toBeInTheDocument();
  });
});
