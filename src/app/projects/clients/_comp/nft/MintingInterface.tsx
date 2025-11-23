import React from "react";

interface MintingInterfaceProps {
  onConnect: () => void;
}

export const MintingInterface: React.FC<MintingInterfaceProps> = ({
  onConnect,
}) => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#8b5cf6",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Create Your NFT
      </h2>
      <div
        style={{
          background: "rgba(139, 92, 246, 0.1)",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
          }}
        >
          🎨
        </div>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
          }}
        >
          Minting requires a connected wallet. Connect your Web3 wallet to
          upload artwork, set properties, and mint your NFT on the blockchain.
        </p>
        <button
          onClick={onConnect}
          style={{
            padding: "1rem 2rem",
            background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "1.1rem",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Connect Wallet to Mint
        </button>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "rgba(139, 92, 246, 0.05)",
            borderRadius: "8px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#8b5cf6",
              marginBottom: "0.75rem",
            }}
          >
            What you'll need:
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.5rem",
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: "1.8",
            }}
          >
            <li>Connected Web3 wallet (MetaMask, WalletConnect, etc.)</li>
            <li>Digital artwork or media file</li>
            <li>ETH for gas fees (varies by network)</li>
            <li>NFT metadata (name, description, properties)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
