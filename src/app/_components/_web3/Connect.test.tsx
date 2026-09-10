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

let mockConnectors: any[] = [];
let mockAccount: {
  connector: any;
  isConnected: boolean;
  address: string | null;
} = {
  connector: null,
  isConnected: false,
  address: null,
};

jest.mock("wagmi", () => ({
  useAccount: () => mockAccount,
  useConnect: () => ({
    connect: mockConnect,
    connectors: mockConnectors,
    error: null,
    isPending: false,
  }),
  useDisconnect: () => ({ disconnect: mockDisconnect }),
}));

describe("Connect component", () => {
  beforeEach(() => {
    mockConnect.mockClear();
    mockDisconnect.mockClear();
    mockAccount = { connector: null, isConnected: false, address: null };
  });

  it("renders WalletConnect button and calls connect when clicked", () => {
    mockConnectors = [
      { id: "walletConnect", name: "WalletConnect", ready: true },
    ];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Connect } = require("./Connect");
    render(React.createElement(Connect));

    const wcBtn = screen.getByRole("button", { name: /WalletConnect/i });
    expect(wcBtn).toBeInTheDocument();

    fireEvent.click(wcBtn);

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(mockConnect).toHaveBeenCalledWith({
      connector: expect.objectContaining({ id: "walletConnect" }),
    });
  });

  // Regression test for the critical bug where Connect.tsx filtered
  // connectors down to `x.id === WALLET_CONNECT_ID` only, which silently
  // hid the MetaMask (and any other non-WalletConnect) button entirely —
  // clicking "Connect Wallet" had no way to reach MetaMask even though it
  // was configured in src/wagmi.ts.
  it("renders a MetaMask button and connects to it when the extension is ready", () => {
    mockConnectors = [
      { id: "injected", name: "Injected", ready: false },
      { id: "metaMask", name: "MetaMask", ready: true },
      { id: "walletConnect", name: "WalletConnect", ready: true },
    ];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Connect } = require("./Connect");
    render(React.createElement(Connect));

    const mmBtn = screen.getByRole("button", {
      name: /Connect to MetaMask wallet/i,
    });
    expect(mmBtn).toBeInTheDocument();
    expect(mmBtn).not.toBeDisabled();

    fireEvent.click(mmBtn);

    expect(mockConnect).toHaveBeenCalledWith({
      connector: expect.objectContaining({ id: "metaMask" }),
    });
  });

  it("shows a fallback-provider hint and disables extension wallets when no extension is detected", () => {
    mockConnectors = [
      { id: "injected", name: "Injected", ready: false },
      { id: "metaMask", name: "MetaMask", ready: false },
      { id: "walletConnect", name: "WalletConnect", ready: true },
    ];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Connect } = require("./Connect");
    render(React.createElement(Connect));

    expect(
      screen.getByText(/No browser wallet extension detected/i),
    ).toBeInTheDocument();

    const mmBtn = screen.getByRole("button", {
      name: /Connect to MetaMask wallet/i,
    });
    expect(mmBtn).toBeDisabled();

    const wcBtn = screen.getByRole("button", {
      name: /Connect to WalletConnect wallet/i,
    });
    expect(wcBtn).not.toBeDisabled();
  });

  it("does not show the fallback hint once an extension wallet is ready", () => {
    mockConnectors = [
      { id: "metaMask", name: "MetaMask", ready: true },
      { id: "walletConnect", name: "WalletConnect", ready: true },
    ];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Connect } = require("./Connect");
    render(React.createElement(Connect));

    expect(
      screen.queryByText(/No browser wallet extension detected/i),
    ).not.toBeInTheDocument();
  });
});
