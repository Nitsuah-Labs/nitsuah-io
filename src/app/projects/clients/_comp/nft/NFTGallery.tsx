import React from "react";

interface NFT {
  id: number;
  name: string;
  price: string;
  image: string;
  creator: string;
}

interface NFTGalleryProps {
  nfts: NFT[];
  onConnect: () => void;
}

export const NFTGallery: React.FC<NFTGalleryProps> = ({ nfts, onConnect }) => {
  return (
    <div>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#8b5cf6",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Trending NFTs
      </h2>
      <div
        className="nft-gallery-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.5rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="nft-card"
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "2px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#8b5cf6";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(139, 92, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                fontSize: "5rem",
                textAlign: "center",
                padding: "2rem 1rem",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%)",
              }}
            >
              {nft.image}
            </div>
            <div style={{ padding: "1rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#fff",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {nft.name}
              </h3>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  marginBottom: "0.75rem",
                }}
              >
                By {nft.creator}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "#8b5cf6",
                  }}
                >
                  {nft.price}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onConnect();
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          padding: "2rem",
          background: "rgba(139, 92, 246, 0.05)",
          borderRadius: "12px",
          border: "2px dashed rgba(139, 92, 246, 0.3)",
          maxWidth: "600px",
          margin: "3rem auto 0",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔗</div>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#8b5cf6",
            marginBottom: "0.75rem",
          }}
        >
          Connect Your Wallet
        </h3>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
          }}
        >
          View your collection, make purchases, and interact with the blockchain
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
          }}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};
