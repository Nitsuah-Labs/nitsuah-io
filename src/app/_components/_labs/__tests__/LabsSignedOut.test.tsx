import { render, screen } from "@testing-library/react";
import LabsSignedOut from "../LabsSignedOut";

// Connect pulls in wagmi connectors; a stub is enough to check placement.
jest.mock("../../_web3/Connect", () => ({
  Connect: () => <button type="button">Connect Wallet</button>,
}));

describe("LabsSignedOut", () => {
  it("explains the wallet requirement and offers a connect control", () => {
    render(<LabsSignedOut />);
    expect(
      screen.getByRole("heading", { name: "Connect a wallet" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This lab needs a connected wallet to continue."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /connect wallet/i }),
    ).toBeInTheDocument();
  });
});
