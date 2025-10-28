/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

// Mock wagmi hooks used by the Connect component
const mockConnect = jest.fn();
const mockDisconnect = jest.fn();

jest.mock("wagmi", () => ({
  useAccount: () => ({ connector: null, isConnected: false }),
  useConnect: () => ({
    connect: mockConnect,
    connectors: [
      { id: "meta", name: "MetaMask", ready: true },
      { id: "wc", name: "WalletConnect", ready: true },
    ],
    error: null,
    isPending: false,
  }),
  useDisconnect: () => ({ disconnect: mockDisconnect }),
}));

describe("Connect component", () => {
  it("renders connector buttons and calls connect when clicked", () => {
    // Import after mocks are in place
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Connect } = require("./Connect");

    render(React.createElement(Connect));

    const metaBtn = screen.getByRole("button", { name: /MetaMask/i });
    expect(metaBtn).toBeInTheDocument();

    fireEvent.click(metaBtn);

    expect(mockConnect).toHaveBeenCalledTimes(1);
    // First call should receive an object with the selected connector
    expect(mockConnect).toHaveBeenCalledWith({
      connector: expect.objectContaining({ id: "meta" }),
    });
  });
});
