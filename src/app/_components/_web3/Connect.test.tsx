/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

// Mock wagmi hooks used by the Connect component
const mockConnect = jest.fn();
const mockDisconnect = jest.fn();

jest.mock("wagmi", () => ({
  useAccount: () => ({ connector: null, isConnected: false, address: null }),
  useConnect: () => ({
    connect: mockConnect,
    connectors: [{ id: "walletConnect", name: "WalletConnect", ready: true }],
    error: null,
    isPending: false,
  }),
  useDisconnect: () => ({ disconnect: mockDisconnect }),
}));

// Mock the WALLET_CONNECT_ID constant
jest.mock("../../../lib/constants/wallets", () => ({
  WALLET_CONNECT_ID: "walletConnect",
}));

describe("Connect component", () => {
  it("renders WalletConnect button and calls connect when clicked", () => {
    // Import after mocks are in place
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Connect } = require("./Connect");

    render(React.createElement(Connect));

    const wcBtn = screen.getByRole("button", { name: /WalletConnect/i });
    expect(wcBtn).toBeInTheDocument();

    fireEvent.click(wcBtn);

    expect(mockConnect).toHaveBeenCalledTimes(1);
    // First call should receive an object with the selected connector
    expect(mockConnect).toHaveBeenCalledWith({
      connector: expect.objectContaining({ id: "walletConnect" }),
    });
  });
});
