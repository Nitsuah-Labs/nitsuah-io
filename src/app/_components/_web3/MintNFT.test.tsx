/* eslint-disable @typescript-eslint/no-require-imports */
// @jest-environment jsdom
// Mock generated hooks before importing the component so Jest doesn't try to
// evaluate the ESM-only generated code during tests.
// Mock the generated module at the top level. Using a factory here ensures the
// module is replaced before the test requires the component.
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

// We'll apply the mock inside jest.isolateModules using jest.doMock so the
// generated module is mocked before MintNFT (which imports it) is evaluated.

const queryClient = new QueryClient();

const renderWithProviders = (ui) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("MintNFT Component", () => {
  it("renders the minting section", () => {
    // Require the component after Jest has loaded manual mocks from
    // src/__mocks__/generated.js. Using require here avoids ESM import-time
    // evaluation of the generated file.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const MintNFT = require("./MintNFT").MintNFT;

    renderWithProviders(<MintNFT />);

    // Check if the "Mint" button is present
    const mintButton = screen.getByRole("button", { name: /Mint/i });
    expect(mintButton).toBeInTheDocument();

    // Check that the token ID input is present
    const input = screen.getByPlaceholderText(/Token ID \(optional\)/i);
    expect(input).toBeInTheDocument();
  });
});
