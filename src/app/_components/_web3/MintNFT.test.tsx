// Mock generated hooks before importing the component so Jest doesn't try to
// evaluate the ESM-only generated code during tests.
jest.mock("../../../generated", () => ({
  useSimulateWagmiMintExampleMint: () => ({ data: { request: {} } }),
  useWriteWagmiMintExampleMint: () => ({
    data: null,
    writeContract: jest.fn(),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MintNFT } from "./MintNFT";

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe.skip("MintNFT Component", () => {
  it.skip("renders the minting section", () => {
    // Mock generated hooks so Jest doesn't try to import the generated file which
    // depends on ESM-only wagmi/codegen. We only need the hooks used by the component.
    jest.mock("../../../generated", () => ({
      useSimulateWagmiMintExampleMint: () => ({ data: { request: {} } }),
      useWriteWagmiMintExampleMint: () => ({
        data: null,
        writeContract: jest.fn(),
        isPending: false,
        isError: false,
        error: null,
      }),
    }));

    renderWithProviders(<MintNFT />);

    // Check if the "Mint" button is present
    const mintButton = screen.getByRole("button", { name: /Mint/i });
    expect(mintButton).toBeInTheDocument();

    // Check that the token ID input is present
    const input = screen.getByPlaceholderText(/Token ID \(optional\)/i);
    expect(input).toBeInTheDocument();
  });
});
